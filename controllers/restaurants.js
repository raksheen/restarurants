const express = require("express");
const router = express();
const Rest = require("../models/restaurants.js");
var moment = require("moment");

router.get("/", Rest.allPlaces, Rest.customPlaces, (req, res) => {
  var currentTime = moment().format("LLL");

  //   allRestaurantsData: res.locals.allRestaurantsData.restaurants
  // });
  res.render("restaurants", {
    allRestaurantsData: res.locals.allRestaurantsData,
    myRestaurants: res.locals.myRestaurants,
    time: currentTime
  });
  // res.send("route working");
});

// router.get("/favorites", Rest.customPlaces, (req, res) => {
router.get("/favorites", (req, res) => {
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
  console.log("in create function controller");
  res.json({ id: res.locals.newRestaurantId, body: req.body });
});

router.get("/:restaurant-edit", Rest.create, (req, res, next) => {
  res.render("restaurant-edit");
});

//rest comment
router.post("/:id", Rest.commentCreate, (req, res, next) => {
  console.log("rest.Commentcreate controller working");
  res.json({ id: res.locals.newComment });
  // res.redirect("/");
});

//CODE FOR CREATING A COMMENT

// router.post("/:id/edit", Rest.commentCreate, (req, res, next) => {
//   console.log("in post at routerpost. res.locals:", res.params);
//   res.render("restaurant-edit", {
//     id: req.params.id,
//     res_id: req.params.res_id,
//     new_comment: req.params.new_comment
//   });
// });

// router.get("/:restaurant-edit", Rest.commentcreate, (req, res, next) => {
//   res.render("restaurant-edit");
// });

//Update or Edit:

router.get("/:id/edit", Rest.findById, (req, res, next) => {
  //res.json(res.locals.myRestaurants);
  // res.json(res.locals.restaurantData);
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
