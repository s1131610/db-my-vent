const connection = require("./db.js");
const sql = require("./db.js");
// constructor
const SvcProvNote = function(svcProvNote) {
  this.svcProvID = svcProvNote.svcProvID;
  this.note = svcProvNote.note;
};

SvcProvNote.create = (newsvcProvNote, result) => {
  connection.query("INSERT INTO svcprovnote SET ?", newsvcProvNote, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created svcProvNote: ", { id: res.insertId, ...newsvcProvNote });
    result(null, { id: res.insertId, ...newsvcProvNote });
  });
};


SvcProvNote.findById = (svcProvNoteId, result) => {
  sql.query(`SELECT * FROM svcprovnote WHERE noteID = ${svcProvNoteId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    if (res.length) {
      console.log("found svcProvNote: ", res[0]);
      result(null, res[0]);
      return;
    }
    // not found svcProvNote with the id
    result({ kind: "not_found" }, null);
  });
};

SvcProvNote.getAll = result => {
  sql.query("SELECT * FROM svcprovnote", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("svcProvNote: ", res);
    result(null, res);
  });
};

SvcProvNote.updateById = (id, svcProvNote, result) => {
  sql.query(
    "UPDATE svcprovnote SET note = ? WHERE noteID = ?",
    [svcProvNote.userID, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found svcProvNote with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated svcProvNote: ", { id: id, ...svcProvNote });
      result(null, { id: id, ...svcProvNote });
    }
  );
};

SvcProvNote.remove = (id, result) => {
  sql.query("DELETE FROM svcprovnote WHERE noteID = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found svcProvNote with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted svcProvNote with id: ", id);
    result(null, res);
  });
};

SvcProvNote.removeAll = result => {
  sql.query("DELETE FROM svcprovnote", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} svcProvNote`);
    result(null, res);
  });
};

module.exports = SvcProvNote;
