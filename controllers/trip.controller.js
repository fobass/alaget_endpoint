const Trip = require("../models/trip.model")

exports.get = (req, res) => {
    Trip.get(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Trip with ${req.params.id} id not found`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Member "
        });
      }
    } else res.send(data);
  });
};


exports.insert = (req, res) => {
  // Validate request
  if ((!req.body) || (Object.keys(req.body).length === 0)) {
    res.status(400).send({
      message: "Content can not be empty!"
    });

    return
  }

  // Save trip in the database
  Trip.insert(new Trip(req.body), (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Trip."
      });
    else res.send(data);
  });
};

exports.update = (req, res) => {
  // Validate Request
  if ((!req.body) || (Object.keys(req.body).length === 0)) {
    res.status(400).send({
      message: "Content can not be empty!"
    });

    return
  }

  Trip.update(new Trip(req.body), (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Profile with id ${req.body.id}.`
        });
      } else {
        res.status(500).send({
          message: "Error updating Profile with id " + req.body.id
        });
      }
    } else res.send(data);
  }
  );
};


exports.delete = (req, res) => {
    Trip.delete(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Trip with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Trip with id " + req.params.id
        });
      }
    } else res.send({ message: `Trip was deleted successfully!`, id: req.params.id });
  });
};