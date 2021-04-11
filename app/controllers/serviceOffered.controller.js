const ServiceOffered = require("../models/serviceOffered.model.js");

// Create and Save a new ServiceOffered
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a ServiceOffered
  const serviceOffered = new ServiceOffered({
    typeID : req.body.typeID,
    svcProvID: req.body.svcProvID,
    service: req.body.service
  });

  // Save ServiceOffered in the database
  ServiceOffered.create(serviceOffered, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the ServiceOffered."
      });
    else res.send(data);
  });
};





// Retrieve all ServiceOffereds from the database.
exports.findAll = (req, res) => {
  ServiceOffered.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving serviceOffereds."
      });
    else res.send(data);
  });
};

// Find a single ServiceOffered with a serviceOfferedId
exports.findOne = (req, res) => {
  ServiceOffered.findById(req.params.serviceOfferedId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found ServiceOffered with id ${req.params.serviceOfferedId}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving ServiceOffered with id " + req.params.serviceOfferedId
        });
      }
    } else res.send(data);
  });
};



// Update a ServiceOffered identified by the scvProvIDId in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  console.log(req.body);

  ServiceOffered.updateById(
    req.params.scvProvIDId,
    new ServiceOffered(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found ServiceOffered with id ${req.params.scvProvIDId}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating ServiceOffered with id " + req.params.scvProvIDId
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a ServiceOffered with the specified scvProvIDId in the request
exports.delete = (req, res) => {
  ServiceOffered.remove(req.params.scvProvIDId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found ServiceOffered with id ${req.params.scvProvIDId}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete ServiceOffered with id " + req.params.scvProvIDId
        });
      }
    } else res.send({ message: `ServiceOffered was deleted successfully!` });
  });
};

// Delete all ServiceOffereds from the database.
exports.deleteAll = (req, res) => {
  ServiceOffered.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all scvProvIDs."
      });
    else res.send({ message: `All ServiceOffereds were deleted successfully!` });
  });
};
