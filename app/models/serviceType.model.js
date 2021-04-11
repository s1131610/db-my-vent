const connection = require("./db.js");
const sql = require("./db.js");
// constructor
const ServiceType = function(serviceType) {
  this.serviceName = serviceType.serviceName;
};

ServiceType.create = (newserviceType, result) => {
  connection.query("INSERT INTO servicetype SET ?", newserviceType, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created serviceType: ", { id: res.insertId, ...newserviceType });
    result(null, { id: res.insertId, ...newserviceType });
  });
};


ServiceType.findById = (serviceTypeId, result) => {
  sql.query(`SELECT * FROM servicetype WHERE typeID = ${serviceTypeId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    if (res.length) {
      console.log("found serviceType: ", res[0]);
      result(null, res[0]);
      return;
    }
    // not found serviceType with the id
    result({ kind: "not_found" }, null);
  });
};

ServiceType.getAll = result => {
  sql.query("SELECT * FROM servicetype", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("serviceType: ", res);
    result(null, res);
  });
};

ServiceType.updateById = (id, serviceType, result) => {
  sql.query(
    "UPDATE servicetype SET serviceName = ? WHERE typeID = ?",
    [serviceType.userID, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found serviceType with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated serviceType: ", { id: id, ...serviceType });
      result(null, { id: id, ...serviceType });
    }
  );
};

ServiceType.remove = (id, result) => {
  sql.query("DELETE FROM servicetype WHERE typeID = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found serviceType with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted serviceType with id: ", id);
    result(null, res);
  });
};

ServiceType.removeAll = result => {
  sql.query("DELETE FROM servicetype", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} serviceType`);
    result(null, res);
  });
};

module.exports = ServiceType;
