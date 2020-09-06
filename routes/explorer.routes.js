let router = require('express').Router();
const explorer = require("../controllers/explorer.controller.js");


router.post("/", explorer.get);
// router.put("/:uuid", explorer.update);
// router.delete("/:uuid", explorer.delete);
// router.post("/media/:uuid", profile.uploadMedia);

module.exports = router;