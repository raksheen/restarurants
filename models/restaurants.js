const axios = require("axios");
const db = require("../db/index.js");

// const Restaurants = {};
const places = {};

// fetch all the rest data from API:
places.allPlaces = (req, res, next) => {
	axios({
		headers: { "user-key": "bcd9534c24103ccbe87c49c74e71851a" },
		url:
			"https://developers.zomato.com/api/v2.1/search?entity_type=zone&q=pizza",
		// "https://developers.zomato.com/api/v2.1/search?entity_id=94741&entity_type=zone",
		// "https://developers.zomato.com/api/v2.1/search?entity_id=94741&entity_type=zone&cuisines=55",
		method: "get"
	})
		.then(response => {
			// store the data we got back from the
			// server in res.locals, and then
			// call next()
			res.locals.allRestaurantsData = response.data;
			next();
		})
		.catch(err => {
			console.log("error encountered in Restaurants.allPlaces. error: ", err);
		});
};

// show
places.showPlaces = (req, res, next) => {
	const name = req.params.name;
	axios({
		headers: { "user-key": "bcd9534c24103ccbe87c49c74e71851a" },
		url:
			"https://developers.zomato.com/api/v2.1/search?entity_type=zone&q=pizza",

		// "developers.zomato.com/api/v2.1/search?entity_id=94741&entity_type=zone",
		// "https://developers.zomato.com/api/v2.1/search?entity_id=94741&entity_type=zone&cuisines=55",
		method: "get"
	})
		.then(response => {
			res.locals.RestaurantData = response.data;
			//
			next();
		})
		.catch(err => {
			console.log("error encountered in Restaurants.showPlaces. error: ", err);
		});
};

//// CRUD ////

places.create = (req, res, next) => {
	console.log("in create function in model " + req.body.name);
	db
		.one("INSERT INTO places (name) VALUES ($1) RETURNING id;", [req.body.name])
		.then(data => {
			res.locals.newRestaurantId = data.id;
			next();
		})
		.catch(error => {
			console.log("error encountered in places.create. Error:", error);
			next(error);
		});
};

places.commentCreate = (req, res, next) => {
	// console.log("commentCreate model is workin!", data.id);
	console.log(req.body);
	db
		.one(
			"INSERT INTO comments (rest_id, comment) VALUES ($1, $2) RETURNING id;",
			[req.body.id, req.body.comment]
		)
		.then(data => {
			res.locals.newComment = data.id;
			console.log("commentCreate model is workin!", data.id);
			next();
		})
		.catch(error => {
			console.log("error encountered in places.create. Error:", error);
			next(error);
		});
};

places.combined = (req, res, next) => {
	const id = req.params.id;
	db
		.manyOrNone("SELECT * FROM comments WHERE commments.rest_id = ${id}", {
			id: id
		})
		.then(data => {
			res.locals.myRestaurants = data;
			next();
		})
		.catch(err => {});
};

// places.commentCreate = (req, res, next) => {
// 	console.log("----------------------");
// 	console.log("in restaurantsModel.makeComment. req.body:", req.params);

// 	const res_id = req.params.id;
// 	const comment = req.body.comment;
// 	db
// 		.one(
// 			"INSERT INTO comments (res_id, comment, author) VALUES ($1, $2, $3) RETURNING id;",
// 			[res_id, comment]
// 		)
// 		.then(result => {
// 			res.locals.comment = result;
// 			next();
// 		})
// 		.catch(err => {
// 			console.log("Error encountered in places.commentCreate. error:", err);
// 			next(err);
// 		});
// };

places.customPlaces = (req, res, next) => {
	db
		.many("SELECT * FROM places;")
		.then(data => {
			res.locals.myRestaurants = data;
			next();
		})
		.catch(error => {
			console.log("error encountered in places.customPlaces. Error:", error);
			next(error);
		});
};
places.destroy = (req, res, next) => {
	db
		.none("DELETE FROM places WHERE id = $1", [req.params.id])
		.then(() => {
			next();
		})
		.catch(error => {
			console.log("error encountered in places.destroy. error:", error);
			next(error);
		});
};

places.update = (req, res, next) => {
	db
		.one("UPDATE places SET name = $1 WHERE id = $2 RETURNING id;", [
			req.body.name,
			req.body.id
		])
		.then(data => {
			res.locals.restaurantData = data;
			next();
		})
		.catch(error => {
			console.log("error encountered in places.update. Error:", error);
			next(error);
		});
};

places.findById = (req, res, next) => {
	db
		.one("SELECT * FROM places WHERE id = $1;", [req.params.id])
		.then(data => {
			res.locals.restaurantData = data;
			next();
		})
		.catch(error => {
			console.log("error in places.findById. Error:", error);
			next(error);
		});
};

module.exports = places;
