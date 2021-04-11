const EventMgr = require("../models/eventMgr.model.js");

// Create and Save a new EventMgr
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create an EventMgr
  const eventMgr = new EventMgr({
    userID : req.body.userID,
  });


  // Save EventMgr in the database
  EventMgr.create(eventMgr, (err, data) => {
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
  EventMgr.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving eventMgrs."
      });
    else res.send(data);
  });
};



// Find a single EventMgr with a eventMgrId
exports.findById = (req, res) => {
  EventMgr.findById(req.params.eventMgrId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Event with id ${req.params.eventMgrId}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Event with id " + req.params.eventMgrId
        });
      }
    } else res.send(data);
  });
};


// Update a Event identified by the eventMgrId in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  console.log(req.body);

  EventMgr.updateById(
    req.params.eventMgrId,
    new EventMgr(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Event with id ${req.params.eventMgrId}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Event with id " + req.params.eventMgrId
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a Event with the specified eventMgrId in the request
exports.delete = (req, res) => {
  EventMgr.remove(req.params.eventMgrId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Event with id ${req.params.eventMgrId}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Event with id " + req.params.eventMgrId
        });
      }
    } else res.send({ message: `Event was deleted successfully!` });
  });
};

// Delete all Events from the database.
exports.deleteAll = (req, res) => {
  EventMgr.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all eventMgrs."
      });
    else res.send({ message: `All Events were deleted successfully!` });
  });
};
