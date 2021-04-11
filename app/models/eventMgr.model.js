const connection = require("./db.js");
const sql = require("./db.js");
// constructor
const EventMgr = function(eventMgr) {
  this.userID = eventMgr.userID;
};

EventMgr.create = (neweventMgr, result) => {
  connection.query("INSERT INTO eventmanager SET ?", neweventMgr, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created eventMgr: ", { id: res.insertId, ...neweventMgr });
    result(null, { id: res.insertId, ...neweventMgr });
  });
};


EventMgr.findById = (eventMgrId, result) => {
  sql.query(`SELECT * FROM eventmanager WHERE eventMgrID = ${eventMgrId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    if (res.length) {
      console.log("found eventMgr: ", res[0]);
      result(null, res[0]);
      return;
    }
    // not found eventMgr with the id
    result({ kind: "not_found" }, null);
  });
};

EventMgr.getAll = result => {
  sql.query("SELECT * FROM eventmanager", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("eventMgr: ", res);
    result(null, res);
  });
};

EventMgr.updateById = (id, eventMgr, result) => {
  sql.query(
    "UPDATE eventmanager SET userID = ? WHERE eventMgrID = ?",
    [eventMgr.userID, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found eventMgr with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated eventMgr: ", { id: id, ...eventMgr });
      result(null, { id: id, ...eventMgr });
    }
  );
};

EventMgr.remove = (id, result) => {
  sql.query("DELETE FROM eventmanager WHERE eventMgrID = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found eventMgr with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted eventMgr with id: ", id);
    result(null, res);
  });
};

EventMgr.removeAll = result => {
  sql.query("DELETE FROM eventmanager", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} eventMgr`);
    result(null, res);
  });
};

module.exports = EventMgr;
