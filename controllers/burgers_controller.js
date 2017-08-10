var express = require("express");
var router = express.Router();
// Import the model (burger.js) to use its database functions.
var burger = require("../models/burger.js");
// Create all our routes and set up logic within those routes where required.
router.get("/", function(req, res) {
  burger.selectAll(function(data) {
    var hbsObject = {
      burgers: data
    };
    console.log(hbsObject);
    res.render("index", hbsObject);
  });
});
//burgers/insertone should post burger info user has entered
router.get("/index", function(req, res) {
  burger.insertOne(["burger_name", "devoured"
  ], [
      req.body.burger_name, false
      
  ], function() {
    res.redirect("/index");
  });
});
//put updates the status of the uneated burgers
router.post("/burgers/insertOne", function(req, res) {
  var condition = "id = " + req.params.id;
  console.log("condition", condition);
  burger.updateOne({
    devoured: req.body.devoured
  }, condition, function() {
    res.redirect("/index");
  });
});
router.put("/burgers/updateOne/:id", function(req, res) {
  var condition = "id = " + req.params.id;
  console.log("condition", condition);
  burger.updateOne({
    devoured: req.body.devoured
  }, condition, function() {
    res.redirect("/index");
  });
});

// export the router (controller) back to the server
module.exports = router;
