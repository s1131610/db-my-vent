const SvcProvNote = require("../models/svcProvNote.model.js");

// Create and Save a new SvcProvNote
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create an SvcProvNote
  const svcProvNote = new SvcProvNote({
    svcProvID : req.body.svcProvID,
    note : req.body.note
  });


  // Save SvcProvNote in the database
  SvcProvNote.create(svcProvNote, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the SvcProvNote."
      });
    else res.send(data);
  });
};

// Retrieve all SvcProvNotes from the database.
exports.findAll = (req, res) => {
  SvcProvNote.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving svcProvNotes."
      });
    else res.send(data);
  });
};



// Find a single SvcProvNote with a svcProvNoteId
exports.findById = (req, res) => {
  SvcProvNote.findById(req.params.svcProvNoteId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found SvcProvNote with id ${req.params.svcProvNoteId}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving SvcProvNote with id " + req.params.svcProvNoteId
        });
      }
    } else res.send(data);
  });
};


// Update a SvcProvNote identified by the svcProvNoteId in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  console.log(req.body);

  SvcProvNote.updateById(
    req.params.svcProvNoteId,
    new SvcProvNote(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found SvcProvNote with id ${req.params.svcProvNoteId}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating SvcProvNote with id " + req.params.svcProvNoteId
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a SvcProvNote with the specified svcProvNoteId in the request
exports.delete = (req, res) => {
  SvcProvNote.remove(req.params.svcProvNoteId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found SvcProvNote with id ${req.params.svcProvNoteId}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete SvcProvNote with id " + req.params.svcProvNoteId
        });
      }
    } else res.send({ message: `SvcProvNote was deleted successfully!` });
  });
};

// Delete all SvcProvNotes from the database.
exports.deleteAll = (req, res) => {
  SvcProvNote.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all svcProvNotes."
      });
    else res.send({ message: `All SvcProvNotes were deleted successfully!` });
  });
};
