module.exports = app => {
    const serviceProviders = require("../controllers/serviceProvider.controller.js");
  
    // Create a new ServiceProvider
    app.post("/serviceProviders", serviceProviders.create);
  
    // Retrieve all ServiceProviders
    app.get("/serviceProviders", serviceProviders.findAll);
  
    // Retrieve a single ServiceProvider with serviceProviderId
    app.get("/serviceProviders/:serviceProviderId", serviceProviders.findOne);
  
    // Update a ServiceProvider with serviceProviderId
    app.put("/serviceProviders/:serviceProviderId", serviceProviders.update);
  
    // Delete a ServiceProvider with serviceProviderId
    app.delete("/serviceProviders/:serviceProviderId", serviceProviders.delete);
  
    // Create a new ServiceProvider
    app.delete("/serviceProviders", serviceProviders.deleteAll);
  };
  