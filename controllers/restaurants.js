const express = require("express");
const router = express();
const Rest = require("../models/restaurants.js");

router.get("/", Rest.allPlaces, Rest.customPlaces, (req, res) => {
  //   allRestaurantsData: res.locals.allRestaurantsData.restaurants
  // });
  res.render("restaurants", {
    allRestaurantsData: res.locals.allRestaurantsData,
    myRestaurants: res.locals.myRestaurants
  });
  // res.send("route working");
});

// router.get("/favorites", Rest.customPlaces, (req, res) => {
router.get("/favorites", Rest.customPlaces, (req, res) => {
  console.log(res.locals.myRestaurants);
  // res.render(res.locals.myRestaurants);
  res.json(res.locals.myRestaurants);
  res.render();
});

//CRUD//

//create:

router.get("/new", (req, res) => {
  //maybe: /:new
  console.log("in new function");
  res.render("restaurant-new");
});

router.post("/", Rest.create, (req, res, next) => {
  // router.post("/new", Rest.create, (req, res, next) => {
  console.log("rest.create working");
  res.redirect("/");
});

router.get("/:restaurant-edit", Rest.create, (req, res, next) => {
  res.render("restaurant-edit");
});

//Update or Edit:

router.get("/:id/edit", Rest.findById, (req, res, next) => {
  res.render("restaurant-edit", res.locals.restaurantData);
});

router.put("/:id/edit", Rest.update, (req, res, next) => {
  res.json(res.locals.myRestaurants);
});

// router.put("/favorites/:id", Rest.update, (req, res, next) => {
//   res.json(res.locals.restaurantData);
// });

//Delete or Destroy

router.delete("/:id", Rest.destroy, (req, res, next) => {
  res.json({ id: req.params.id });
});

module.exports = router;
