const Explorer = require("../models/explorer.model")

exports.get = (req, res) => {
  if ((!req.body) || (Object.keys(req.body).length === 0)) {
    res.status(400).send({
      message: "Content can not be empty!"
    });

    return
  }

  Explorer.get(req.body.lat, req.body.lon, req.body.uuid, req.body.dist, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Explorer's not found`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Explorer "
        });
      }
    } else res.send(data);
  });
};