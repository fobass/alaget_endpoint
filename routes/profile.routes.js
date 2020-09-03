let router = require('express').Router();
const profile = require("../controllers/profile.controller.js");

router.get("/:uuid", profile.get);
router.post("/", profile.insert);
router.put("/:uuid", profile.update);
router.delete("/:uuid", profile.delete);
// router.post("/media/:uuid", profile.uploadMedia);

module.exports = router;