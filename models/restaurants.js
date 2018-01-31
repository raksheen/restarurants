const axios = require("axios");
const db = require("../db/index.js");

// const Restaurants = {};
const places = {};

// fetch all the rest data
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

// fetch a single restaurant:
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
	console.log(req.body);
	db
		.one("INSERT INTO places (name) VALUES ($1) RETURNING id;", [req.body.name])
		.then(data => {
			res.locals.newRestaurantId = data;
			next();
		})
		.catch(error => {
			console.log("error encountered in places.create. Error:", error);
			next(error);
		});
};

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
