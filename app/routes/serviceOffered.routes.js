module.exports = app => {
    const serviceOffereds = require("../controllers/serviceOffered.controller.js");
  
    // Create a new ServiceOffered
    app.post("/serviceOffered", serviceOffereds.create);
  
    // Retrieve all ServiceOffereds
    app.get("/serviceOffered", serviceOffereds.findAll);
  
    // Retrieve a single ServiceOffered with serviceOfferedId
    app.get("/serviceOffered/:serviceOfferedId", serviceOffereds.findOne);
  
    // Update a ServiceOffered with serviceOfferedId
    app.put("/serviceOffered/:serviceOfferedId", serviceOffereds.update);
  
    // Delete a ServiceOffered with serviceOfferedId
    app.delete("/serviceOffered/:serviceOfferedId", serviceOffereds.delete);
  
    // Create a new ServiceOffered
    app.delete("/serviceOffered", serviceOffereds.deleteAll);
  };
  