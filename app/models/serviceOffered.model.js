const connection = require("./db.js");
const sql = require("./db.js");
// constructor
const ServiceOffered = function(serviceOffered) {
  this.typeID = serviceOffered.typeID;
  this.svcProvID = serviceOffered.svcProvID;
  this.service = serviceOffered.service;
};

ServiceOffered.create = (newserviceOffered, result) => {
  connection.query("INSERT INTO serviceoffered SET ?", newserviceOffered, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created serviceOffered: ", { id: res.insertId, ...newserviceOffered });
    result(null, { id: res.insertId, ...newserviceOffered });
  });
};


ServiceOffered.findById = (serviceOfferedId, result) => {
  sql.query(`SELECT * FROM serviceoffered WHERE servOfferedId = ${serviceOfferedId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    if (res.length) {
      console.log("found serviceOffered: ", res[0]);
      result(null, res[0]);
      return;
    }
    // not found serviceOffered with the id
    result({ kind: "not_found" }, null);
  });
};

ServiceOffered.getAll = result => {
  sql.query("SELECT * FROM serviceoffered", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("serviceOffered: ", res);
    result(null, res);
  });
};

ServiceOffered.updateById = (id, serviceOffered, result) => {
  sql.query(
    "UPDATE serviceoffered SET typeID = ?, svcProvID = ?, service = ? WHERE servOfferedID = ?",
    [serviceOffered.userID, serviceOffered.businessName, serviceOffered.state, serviceOffered.websiteURL, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found serviceOffered with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated serviceOffered: ", { id: id, ...serviceOffered });
      result(null, { id: id, ...serviceOffered });
    }
  );
};

ServiceOffered.remove = (id, result) => {
  sql.query("DELETE FROM serviceoffered WHERE servOfferedID = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found serviceOffered with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted serviceoffered with id: ", id);
    result(null, res);
  });
};

ServiceOffered.removeAll = result => {
  sql.query("DELETE FROM serviceoffered", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} serviceOffered`);
    result(null, res);
  });
};

module.exports = ServiceOffered;
