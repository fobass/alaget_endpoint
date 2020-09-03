let router = require('express').Router();
const trip = require("../controllers/trip.controller.js");

router.get("/:id", trip.get);
router.post("/", trip.insert);
router.put("/:id", trip.update);
router.delete("/:id", trip.delete);
// router.post("/media/:uuid", profile.uploadMedia);

module.exports = router;