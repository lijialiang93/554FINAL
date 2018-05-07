// We will need to require Keystone first
var keystone = require('keystone');
var User = keystone.list('User');
// Then to get access to our API route we will use importer
var importRoutes = keystone.importer(__dirname);
// And finally set up the api on a route
// var routes = {
// 	api: importRoutes('./api'),
// };
const redisConnection = require("./redis-connection");
const nrpSender = require("./nrp-sender-shim");

function signin(req, res) {
  
	if (!req.body.username || !req.body.password) return res.json({ success: false });
	
	User.model.findOne({ email: req.body.username }).exec(function(err, user) {
	  
	  if (err || !user) {
		return res.json({
		  success: false,
		  session: false,
		  message: (err && err.message ? err.message : false) || 'Sorry, there was an issue signing you in, please try again.'
		});
	  }
	  
	  keystone.session.signin({ email: user.email, password: req.body.password }, req, res, function(user) {
		
		return res.json({
		  success: true,
		  session: true,
		  date: new Date().getTime(),
		  userId: user.id,
		  email: user.email
		});
		
	  }, function(err) {
		
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
	if (req.user) return res.json({signedIn: true});
	else return res.json({signedIn: false});
}

// Export our app routes
exports = module.exports = function (app) {
	// Get access to the API route in our app
	app.get('/api/getPopular', async function(req, res){
		try {
			let response = await nrpSender.sendMessage({
				redis: redisConnection,
				eventName: "send-message-with-reply",
				data: {
					type: "getPopularMovies",
					//number of popular movie
					searchQuery: 2
				}
			});
			let reply = {
				popular: response
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
				res.json(reply);
			}
			else {
				return res.json({ movie: "NOT FOUND" });
			}
		} catch (error) {
			console.log(error);
		}
		
	});

	app.post('/api/userRegister', async (req, res) => {
		try {
			let userData = req.body.data;
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
			if (reply.user.length == 0){
				new User.model({
					name: { first: userData.firstName, last: userData.lastName },
					email: userData.email,
					password: userData.password,
					canAccessKeystone: false,
				}).save();
				res.json({ email: userData.email, message: "REGISTRATION SUCCESSFUL!" });
			}
			else {
				res.json({ email: userData.email, message: "has already existed in the system!" })
			}
		} catch (error) {
			console.log(error);
		}
	});

	app.get('/api/userStatusCheck', checkUserStatus);
	app.post('/api/userSignIn', signin);
	app.all('./api/userSign*', checkAuth);

	app.get('/', function (req, res) {
		function renderFullPage() {
			return `
		<!doctype html>
		<html>
			<head>
				<title>Keystone With React And Redux</title>
				<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
			</head>
        <body>
       		 <div class="react-container">
        </div>
				<script src="index.bundle.js"></script>
			</body>
		</html>
		`;
		}
		// Send the html boilerplate
		res.send(renderFullPage());
	});
};
