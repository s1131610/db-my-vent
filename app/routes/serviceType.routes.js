module.exports = app => {
    const serviceType = require("../controllers/serviceType.controller.js");
  
    // Create a new ServiceType
    app.post("/serviceTypes", serviceType.create);
  
    // Retrieve all ServiceTypes
    app.get("/serviceTypes", serviceType.findAll);
  

    
    // Update a ServiceType with eventId
    app.put("/serviceTypes/:eventId", serviceType.update);
  
    // Delete a ServiceType with eventId
    app.delete("/serviceTypes/:eventId", serviceType.delete);
  
    // Create a new ServiceType
    app.delete("/serviceTypes", serviceType.deleteAll);
  };
  