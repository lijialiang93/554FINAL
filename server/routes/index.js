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

// Export our app routes
exports = module.exports = function (app) {
	// Get access to the API route in our app
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


	// app.get('/api/recipe/', keystone.middleware.api, routes.api.recipe.list);
	// // Set up the default app route to  http://localhost:3000/index.html
	app.get('/', function (req, res) {
		// Render some simple boilerplate html
		function renderFullPage() {
			// Note the div class name here, we will use that as a hook for our React code
			return `
		<!doctype html>
		<html>
			<head>
				<title>Keystone With React And Redux</title>
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
	// app.get('/movie.html', function (req, res) {
	// 	// Render some simple boilerplate html
	// 	function renderFullPage() {
	// 		// Note the div class name here, we will use that as a hook for our React code
	// 		return `
	// 	<!doctype html>
	// 	<html>
	// 		<head>
	// 			<title>Keystone With React And Redux</title>
	// 		</head>
    //   <body>
    //     <div class="react-container">
    //     </div>
	// 			<script src="movie.bundle.js"></script>
	// 		</body>
	// 	</html>
	// 	`;
	// 	}
	// 	// Send the html boilerplate
	// 	res.send(renderFullPage());
	// });
};
