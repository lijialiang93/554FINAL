// We will need to require Keystone first
const keystone = require('keystone');
const uuid = require('uuid/v4');
const fs = require('fs');
// ImageMagick
const im = require('imagemagick');
const User = keystone.list('User');
const Review = keystone.list('Review');
const Rate = keystone.list('Rate');
// Then to get access to our API route we will use importer
const importRoutes = keystone.importer(__dirname);
const redisConnection = require("./redis-connection");
const nrpSender = require("./nrp-sender-shim");
const redis = require('redis');
const promise = require("bluebird");
const client = promise.promisifyAll(redis.createClient())

function signin(req, res) {

	if (!req.body.username || !req.body.password) return res.json({ success: false });

	User.model.findOne({ email: req.body.username }).exec(function (err, user) {

		if (err || !user) {
			return res.json({
				success: false,
				session: false,
				message: (err && err.message ? err.message : false) || 'Sorry, there was an issue signing you in, please try again.'
			});
		}

		keystone.session.signin({ email: user.email, password: req.body.password }, req, res, function (user) {

			return res.json({
				success: true,
				session: true,
				date: new Date().getTime(),
				userId: user.id,
				email: user.email
			});

		}, function (err) {

			return res.json({
				success: true,
				session: false,
				message: (err && err.message ? err.message : false) || 'Sorry, there was an issue signing you in, please try again.'
			});

		});

	});
}



function checkAuth(req, res, next) {
	if (req.user) return next();
	return res.status(403).json({ 'error': 'no access' });
}

function checkUserStatus(req, res) {
	if (req.user) return res.json(
		{
			signedIn: true,
			nickname: req.user.name,
			userId: req.user._id,
			canAccessKeystone:req.user.canAccessKeystone
		});
	else return res.json({ signedIn: false });
}

// Export our app routes
exports = module.exports = function (app) {
	app.all('*', async (req, res, next) => {
		res.header("Access-Control-Allow-Origin", "*");
		res.header("Access-Control-Allow-Headers", "X-Requested-With");
		next();
	});
	// Get access to the API route in our app
	app.get('/api/getTopRated', async function (req, res) {
		try {
			let response = await nrpSender.sendMessage({
				redis: redisConnection,
				eventName: "send-message-with-reply",
				data: {
					type: "getTopRatedMovies",
					//number of top rated movie
					searchQuery: 3
				}
			});
			let reply = {
				topRated: response
			};

			res.json(reply);

		} catch (error) {
			console.log(error);
		}
	}),
		app.get('/api/searchMovie', async function (req, res) {
			try {
				
				let response = await nrpSender.sendMessage({
					redis: redisConnection,
					eventName: "send-message-with-reply",
					data: {
						type: "getMovieByName",
						searchQuery: req.query.name
					}
				});
				let reply = {
					movie: response
				};
				if (reply.movie !== null) {
					res.json(reply);
				}
				else {
					return res.json({ movie: "NOT FOUND" });
				}

			} catch (error) {
				console.log(error);
			}

		});

	app.get('/api/searchMovieById', async (req, res) => {

		try {
			// get movie from redis cache
			let redisMovie = await client.getAsync(req.query.id);
			if(redisMovie){
				let reply = {
					movie: JSON.parse(redisMovie)
				};
				console.log('Get '+req.query.id+' from redis')
				res.json(reply)
				return;
			}

			console.log('Get '+req.query.id+' from DB')
			let response = await nrpSender.sendMessage({
				redis: redisConnection,
				eventName: "send-message-with-reply",
				data: {
					type: "getMovieById",
					searchQuery: req.query.id
				}
			});
			let reply = {
				movie: response
			};
			if (reply.movie !== null) {
				//save in redis
				client.set(req.query.id, JSON.stringify(reply.movie));
				res.json(reply);
			}
			else {
				return res.json({ movie: "NOT FOUND" });
			}
		} catch (error) {
			console.log(error);
		}

	});

	app.get('/api/getUserById', async (req, res) => {
		try {
			let response = await nrpSender.sendMessage({
				redis: redisConnection,
				eventName: "user-data-with-reply",
				data: {
					type: "getUserById",
					searchQuery: req.query.id
				}
			});
			let reply = {
				user: response
			};
			if (reply.user !== null) {
				res.json(reply);
			}
			else {
				return res.json({ user: "user not found" });
			}
		} catch (error) {
			console.log(error);
		}
	});

	app.get('/api/getUserAvatarByEmail', async (req, res) => {
		try {
			let response = await nrpSender.sendMessage({
				redis: redisConnection,
				eventName: "user-data-with-reply",
				data: {
					type: "getUserByEmail",
					searchQuery: req.query.email
				}
			});
			let reply = {
				image: response[0].image.filename
			};
			if (reply.image !== null) {
				res.json(reply);
			}
			else {
				return res.json({ image: false });
			}
		} catch (error) {
			console.log(error);
		}
	});

	app.post('/api/userRegister', async (req, res) => {
		try {
			let userData = req.body;
			let avatarImage = req.files.selectedImage;
			let response = await nrpSender.sendMessage({
				redis: redisConnection,
				eventName: "user-data-with-reply",
				data: {
					type: "getUserByEmail",
					searchQuery: userData.email
				}
			});
			let reply = {
				user: response
			};
			if (reply.user.length == 0) {
				var fileName = null;
				im.resize({
					srcData: fs.readFileSync(avatarImage.path, 'binary'),
					width: 300,
					height: 300
				}, async (err, stdout, stderr) => {
					if (err) throw err;
					fileName = uuid() + '.' + avatarImage.extension;
					let writePath = __dirname + '/../public/img/avatar/' + fileName;
					fs.writeFileSync(writePath, stdout, 'binary');
					await new User.model({
						name: userData.username,
						email: userData.email,
						password: userData.password,
						image: {
							filename: fileName,
							size: avatarImage.size,
							mimetype: avatarImage.mimetype
						},
						canAccessKeystone: false,
					}).save();
					let workerResponse = await nrpSender.sendMessage({
						redis: redisConnection,
						eventName: "user-data-with-reply",
						data: {
							type: "getUserByEmail",
							searchQuery: userData.email
						}
					});
					let registerReply = {
						user: workerResponse
					};
					if (registerReply.user.length === 1) {
						res.json({ email: userData.email, message: "registration success!" })
					}
					else {
						res.json({ email: userData.email, message: "something went wrong" })
					}

				});
			}
			else {
				res.json({ email: userData.email, message: "has already existed in the system!" })
			}
		} catch (error) {
			console.log(error);
		}
	});

	app.post('/api/updateUserByEmail', async (req, res) => {
		try {
			let receivedUserData = req.body;
			let avatarImage = req.files.selectedImage;
			let dbQuery = { email: receivedUserData.email };
			let originalUserData = await User.model.findOne(dbQuery);
			if (originalUserData !== null && receivedUserData !== undefined && avatarImage === undefined) {
				if (receivedUserData.newPassword === undefined) {
					await User.model.updateOne(dbQuery, receivedUserData);
				}
				if (receivedUserData.newPassword !== undefined) {
					originalUserData.password = receivedUserData.newPassword;
					await originalUserData.save();
					await User.model.updateOne(dbQuery, receivedUserData);
				}
				return res.json({ result: "Your information has been updated successfully!" });
			}
			else if (originalUserData !== null && receivedUserData !== undefined && avatarImage !== undefined) {
				if (receivedUserData.newPassword === undefined) {
					let fileName = null;
					im.resize({
						srcData: fs.readFileSync(avatarImage.path, 'binary'),
						width: 300,
						height: 300
					}, async (err, stdout, stderr) => {
						if (err) throw err;
						fileName = uuid() + '.' + avatarImage.extension;
						let writePath = __dirname + '/../public/img/avatar/' + fileName;
						let originalPath = __dirname + '/../public/img/avatar/' + originalUserData.image.filename;
						fs.writeFileSync(writePath, stdout, 'binary');
						fs.unlinkSync(originalPath);
						receivedUserData.image = {
							filename: fileName,
							size: avatarImage.size,
							mimetype: avatarImage.mimetype
						};
						await User.model.updateOne(dbQuery, receivedUserData);
					});
				}
				if (receivedUserData.newPassword !== undefined) {
					originalUserData.password = receivedUserData.newPassword;
					await originalUserData.save();
					let fileName = null;
					im.resize({
						srcData: fs.readFileSync(avatarImage.path, 'binary'),
						width: 300,
						height: 300
					}, async (err, stdout, stderr) => {
						if (err) throw err;
						fileName = uuid() + '.' + avatarImage.extension;
						let writePath = __dirname + '/../public/img/avatar/' + fileName;
						let originalPath = __dirname + '/../public/img/avatar/' + originalUserData.image.filename;
						fs.writeFileSync(writePath, stdout, 'binary');
						fs.unlinkSync(originalPath);
						receivedUserData.image = {
							filename: fileName,
							size: avatarImage.size,
							mimetype: avatarImage.mimetype
						};
						let result = await User.model.updateOne(dbQuery, receivedUserData);
					});
				}
				return res.json({ result: "Your information has been updated successfully!" });
			}
			else {
				return res.json({ result: "Something went wrong!" });
			}
		} catch (error) {
			console.log(error);
		}
	});

	app.post('/api/addReview', async (req, res) => {
		try {
			let reviewData = req.body;
			await new Review.model({
				author: reviewData.author,
				content: reviewData.content,
				movie: reviewData.movie
			}).save();
			res.json({ message: "REVIEW ADD SUCCESSFUL!" });

		} catch (error) {
			console.log(error);
		}
	});

	app.get('/api/searchReviewByMovie', async (req, res) => {

		try {
			let response = await nrpSender.sendMessage({
				redis: redisConnection,
				eventName: "review-data-with-reply",
				data: {
					type: "getReviewByMovie",
					searchQuery: req.query.movie
				}
			});
			for (i = 0; i < response.length; i++) {
				let avatarResponse = await nrpSender.sendMessage({
					redis: redisConnection,
					eventName: "user-data-with-reply",
					data: {
						type: "getUserByEmail",
						searchQuery: response[i].author
					}
				});
				if (avatarResponse !== null && avatarResponse[0].image !== undefined) {
					response[i].avatar = avatarResponse[0].image.filename;
				}
			}
			let reply = {
				review: response
			};
			if (reply.review !== null) {
				res.json(reply);
			}
			else {
				return res.json({ review: "NOT FOUND" });
			}
		} catch (error) {
			console.log(error);
		}

	});

	app.get('/api/searchReviewByAuthor', async (req, res) => {

		try {
			let response = await nrpSender.sendMessage({
				redis: redisConnection,
				eventName: "review-data-with-reply",
				data: {
					type: "getReviewByAuthor",
					searchQuery: ({ author: req.query.author, movie: req.query.movie })
				}
			});
			let reply = {
				review: response
			};
			if (reply.review !== null) {
				res.json(reply);
			}
			else {
				return res.json({ review: "NOT FOUND" });
			}
		} catch (error) {
			console.log(error);
		}

	});

	app.post('/api/addRate', async (req, res) => {
		try {
			let rateData = req.body;
			await new Rate.model({
				author: rateData.author,
				rate: rateData.rate,
				movie: rateData.movie
			}).save();

			let response = await nrpSender.sendMessage({
				redis: redisConnection,
				eventName: "send-message-with-reply",
				data: {
					type: "updateTotalRating",
					newRating: rateData.rate,
					movieId: rateData.movie
				}
			});

			res.json({ message: "RATE ADD SUCCESSFUL!" });

		} catch (error) {
			console.log(error);
		}
	});

	app.get('/api/searchRateByMovie', async (req, res) => {

		try {
			let response = await nrpSender.sendMessage({
				redis: redisConnection,
				eventName: "rate-data-with-reply",
				data: {
					type: "getRateByMovie",
					searchQuery: req.query.movie
				}
			});
			let sum = 0;
			for (let i = 0; i < response.length; i++) {
				sum = sum + response[i].rate;
				//console.log(response[i].rate);
			}

			let average = sum / (response.length);
			let reply = {
				rate: average
			};
			if (reply.review !== null) {
				res.json(reply);
			}
			else {
				return res.json({ rate: 0 });
			}
		} catch (error) {
			console.log(error);
		}

	});

	app.get('/api/searchRateByAuthor', async (req, res) => {

		try {
			let response = await nrpSender.sendMessage({
				redis: redisConnection,
				eventName: "rate-data-with-reply",
				data: {
					type: "getRateByAuthor",
					searchQuery: ({ author: req.query.author, movie: req.query.movie })
				}
			});
			let reply = {
				rate: response
			};
			if (reply.review !== null) {
				res.json(reply);
			}
			else {
				return res.json({ rate: "NOT RATED" });
			}
		} catch (error) {
			console.log(error);
		}

	});


	app.get('/api/userStatusCheck', checkUserStatus);
	app.post('/api/userSignIn', signin);


	app.get('/', function (req, res) {
		function renderFullPage() {
			return `
		<!doctype html>
		<html>
			<head>
				<title>Movie Review System</title>
				<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
				<link rel="stylesheet" href="style.css">  
			</head>
        <body>
       		 <div class="react-container">
		</div>
				<script src="index.bundle.js"></script>
				<script src="tota11y.min.js"></script>
			</body>
		</html>
		`;
		}
		// Send the html boilerplate
		res.send(renderFullPage());
	});
};