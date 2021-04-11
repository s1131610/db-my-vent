const ServiceType = require("../models/serviceType.model.js");

// Create and Save a new ServiceType
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create an ServiceType
  const serviceType = new ServiceType({
    serviceName : req.body.serviceName,
  });


  // Save ServiceType in the database
  ServiceType.create(serviceType, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Event."
      });
    else res.send(data);
  });
};

// Retrieve all Events from the database.
exports.findAll = (req, res) => {
  ServiceType.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving serviceTypes."
      });
    else res.send(data);
  });
};



// Find a single ServiceType with a serviceTypeId
exports.findById = (req, res) => {
  ServiceType.findById(req.params.serviceTypeId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Event with id ${req.params.serviceTypeId}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Event with id " + req.params.serviceTypeId
        });
      }
    } else res.send(data);
  });
};


// Update a Event identified by the serviceTypeId in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  console.log(req.body);

  ServiceType.updateById(
    req.params.serviceTypeId,
    new ServiceType(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Event with id ${req.params.serviceTypeId}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Event with id " + req.params.serviceTypeId
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a Event with the specified serviceTypeId in the request
exports.delete = (req, res) => {
  ServiceType.remove(req.params.serviceTypeId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Event with id ${req.params.serviceTypeId}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Event with id " + req.params.serviceTypeId
        });
      }
    } else res.send({ message: `Event was deleted successfully!` });
  });
};

// Delete all Events from the database.
exports.deleteAll = (req, res) => {
  ServiceType.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all serviceTypes."
      });
    else res.send({ message: `All Events were deleted successfully!` });
  });
};
