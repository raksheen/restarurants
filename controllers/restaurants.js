const express = require("express");
const router = express();
const Rest = require("../models/restaurants.js");

router.get("/", Rest.allPlaces, (req, res) => {
  // console.log("hitting trains/", {
  //   allRestaurantsData: res.locals.allRestaurantsData.restaurants
  // });
  res.render("restaurants", {
    allRestaurantsData: res.locals.allRestaurantsData
  });
  // res.send("route working");
});

//is this needed?:

// router.get("/:name", Rest.showPlaces, (req, res) => {
//   res.render("restaurant", res.locals.RestaurantData);

//   // res.render("train", res.locals.trainData);
// });

//CRUD//

router.get("/:new", (req, res) => {
  console.log("in new function");
  res.render("restaurant-new");
});

router.post("/", Rest.create, (req, res, next) => {
  res.json({ id: res.locals.newRestaurant, body: req.body });
});

router.get("/:restaurant-edit", Rest.create, (req, res, next) => {
  res.render("restaurant-edit");
});

// router.post("/", Rest.create, (req, res, next) => {
//   res.json({ id: res.locals.newRestaurant, body: req.body });
// });

// router.get("/:restaurantId/edit", Rest.findById, (req, res, next) => {
//   res.render("restaurant-edit", res.locals.RestaurantData);
// });

// router.delete("/:restaurants", Rest.destroy, (req, res, next) => {
//   res.json({ id: req.params.restaurant });
// });

// router.put("/:restaurants", Rest.update, (req, res, next) => {
//   res.json(res.locals.updatedrestaurantData);
// });
module.exports = router;
