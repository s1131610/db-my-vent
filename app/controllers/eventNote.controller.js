const EventNote = require("../models/eventNote.model.js");

// Create and Save a new EventNote
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create an EventNote
  const eventNote = new EventNote({
    eventID : req.body.eventID,
    note : req.body.note
  });


  // Save EventNote in the database
  EventNote.create(eventNote, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the EventNote."
      });
    else res.send(data);
  });
};

// Retrieve all EventNotes from the database.
exports.findAll = (req, res) => {
  EventNote.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving eventNotes."
      });
    else res.send(data);
  });
};



// Find a single EventNote with a eventNoteId
exports.findById = (req, res) => {
  EventNote.findById(req.params.eventNoteId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found EventNote with id ${req.params.eventNoteId}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving EventNote with id " + req.params.eventNoteId
        });
      }
    } else res.send(data);
  });
};


// Update a EventNote identified by the eventNoteId in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  console.log(req.body);

  EventNote.updateById(
    req.params.eventNoteId,
    new EventNote(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found EventNote with id ${req.params.eventNoteId}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating EventNote with id " + req.params.eventNoteId
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a EventNote with the specified eventNoteId in the request
exports.delete = (req, res) => {
  EventNote.remove(req.params.eventNoteId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found EventNote with id ${req.params.eventNoteId}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete EventNote with id " + req.params.eventNoteId
        });
      }
    } else res.send({ message: `EventNote was deleted successfully!` });
  });
};

// Delete all EventNotes from the database.
exports.deleteAll = (req, res) => {
  EventNote.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all eventNotes."
      });
    else res.send({ message: `All EventNotes were deleted successfully!` });
  });
};
