const connection = require("./db.js");
const sql = require("./db.js");
// constructor
const EventNote = function(eventNote) {
  this.eventID = eventNote.eventID;
  this.note = eventNote.note;
};

EventNote.create = (neweventNote, result) => {
  connection.query("INSERT INTO eventnote SET ?", neweventNote, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created eventNote: ", { id: res.insertId, ...neweventNote });
    result(null, { id: res.insertId, ...neweventNote });
  });
};


EventNote.findById = (eventNoteId, result) => {
  sql.query(`SELECT * FROM eventnote WHERE noteID = ${eventNoteId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    if (res.length) {
      console.log("found eventNote: ", res[0]);
      result(null, res[0]);
      return;
    }
    // not found eventNote with the id
    result({ kind: "not_found" }, null);
  });
};

EventNote.getAll = result => {
  sql.query("SELECT * FROM eventnote", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("eventNote: ", res);
    result(null, res);
  });
};

EventNote.updateById = (id, eventNote, result) => {
  sql.query(
    "UPDATE eventnote SET eventID = ?, note = ? WHERE noteID = ?",
    [eventNote.userID, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found eventNote with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated eventNote: ", { id: id, ...eventNote });
      result(null, { id: id, ...eventNote });
    }
  );
};

EventNote.remove = (id, result) => {
  sql.query("DELETE FROM eventnote WHERE noteID = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found eventNote with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted eventNote with id: ", id);
    result(null, res);
  });
};

EventNote.removeAll = result => {
  sql.query("DELETE FROM eventnote", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} eventNote`);
    result(null, res);
  });
};

module.exports = EventNote;
