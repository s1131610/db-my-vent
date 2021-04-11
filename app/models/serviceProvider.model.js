const connection = require("./db.js");
const sql = require("./db.js");
// constructor
const ServiceProvider = function(serviceProvider) {
  this.userID = serviceProvider.userID;
  this.businessName = serviceProvider.businessName;
  this.state = serviceProvider.state;
  this.websiteURL = serviceProvider.websiteURL;
};

ServiceProvider.create = (newserviceProvider, result) => {
  connection.query("INSERT INTO serviceprovider SET ?", newserviceProvider, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created serviceProvider: ", { id: res.insertId, ...newserviceProvider });
    result(null, { id: res.insertId, ...newserviceProvider });
  });
};


ServiceProvider.findById = (serviceProviderId, result) => {
  sql.query(`SELECT * FROM serviceprovider WHERE svcProviderId = ${serviceProviderId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    if (res.length) {
      console.log("found serviceProvider: ", res[0]);
      result(null, res[0]);
      return;
    }
    // not found serviceProvider with the id
    result({ kind: "not_found" }, null);
  });
};

ServiceProvider.getAll = result => {
  sql.query("SELECT * FROM serviceprovider", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("serviceProvider: ", res);
    result(null, res);
  });
};

ServiceProvider.updateById = (id, serviceProvider, result) => {
  sql.query(
    "UPDATE serviceprovider SET userID = ?, businessName = ?, state = ?, websiteURL = ? WHERE svcProvID = ?",
    [serviceProvider.userID, serviceProvider.businessName, serviceProvider.state, serviceProvider.websiteURL, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found serviceProvider with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated serviceProvider: ", { id: id, ...serviceProvider });
      result(null, { id: id, ...serviceProvider });
    }
  );
};

ServiceProvider.remove = (id, result) => {
  sql.query("DELETE FROM serviceprovider WHERE svcProvID = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found serviceProvider with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted serviceprovider with id: ", id);
    result(null, res);
  });
};

ServiceProvider.removeAll = result => {
  sql.query("DELETE FROM serviceprovider", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} serviceProvider`);
    result(null, res);
  });
};

module.exports = ServiceProvider;
