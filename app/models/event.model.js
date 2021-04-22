const sql = require("./db.js");

// constructor
const Event = function(event) {
  this.eventMgrID = event.eventMgrID;
  this.eventName = event.eventName;
  this.eventDate = event.eventDate;
};

Event.create = (newevent, result) => {
  sql.query("INSERT INTO event SET ?", newevent, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created event: ", { id: res.insertId, ...newevent });
    result(null, { id: res.insertId, ...newevent });
  });
};


Event.findById = (eventId, result) => {
  sql.query(`SELECT * FROM event WHERE eventID = ${eventId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found event: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found event with the id
    result({ kind: "not_found" }, null);
  });
};


Event.getAll = result => {
  sql.query("SELECT *, eventID AS id from event", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("event: ", res);
    result(null, res);
  });
};

Event.updateById = (id, event, result) => {
  sql.query(
    "UPDATE event SET eventName = ?, eventDate = ? WHERE eventID = ?",
    [event.eventName, event.eventDate, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found event with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated event: ", { id: id, ...event });
      result(null, { id: id, ...event });
    }
  );
};

Event.remove = (id, result) => {
  sql.query("DELETE FROM event WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found event with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted event with id: ", id);
    result(null, res);
  });
};

Event.removeAll = result => {
  sql.query("DELETE FROM event", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} event`);
    result(null, res);
  });
};

module.exports = Event;
