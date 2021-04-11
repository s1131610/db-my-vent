const ServiceProvider = require("../models/serviceProvider.model.js");

// Create and Save a new ServiceProvider
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a ServiceProvider
  const serviceProvider = new ServiceProvider({
    userID : req.body.userID,
    businessName: req.body.businessName,
    state: req.body.state,
    websiteURL: req.body.websiteURL
  });

  // Save ServiceProvider in the database
  ServiceProvider.create(serviceProvider, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the ServiceProvider."
      });
    else res.send(data);
  });
};





// Retrieve all ServiceProviders from the database.
exports.findAll = (req, res) => {
  ServiceProvider.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving serviceProviders."
      });
    else res.send(data);
  });
};

// Find a single ServiceProvider with a serviceProviderId
exports.findOne = (req, res) => {
  ServiceProvider.findById(req.params.serviceProviderId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found ServiceProvider with id ${req.params.serviceProviderId}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving ServiceProvider with id " + req.params.serviceProviderId
        });
      }
    } else res.send(data);
  });
};



// Update a ServiceProvider identified by the scvProvIDId in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  console.log(req.body);

  ServiceProvider.updateById(
    req.params.scvProvIDId,
    new ServiceProvider(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found ServiceProvider with id ${req.params.scvProvIDId}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating ServiceProvider with id " + req.params.scvProvIDId
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a ServiceProvider with the specified scvProvIDId in the request
exports.delete = (req, res) => {
  ServiceProvider.remove(req.params.scvProvIDId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found ServiceProvider with id ${req.params.scvProvIDId}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete ServiceProvider with id " + req.params.scvProvIDId
        });
      }
    } else res.send({ message: `ServiceProvider was deleted successfully!` });
  });
};

// Delete all ServiceProviders from the database.
exports.deleteAll = (req, res) => {
  ServiceProvider.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all scvProvIDs."
      });
    else res.send({ message: `All ServiceProviders were deleted successfully!` });
  });
};
