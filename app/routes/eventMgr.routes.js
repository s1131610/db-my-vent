module.exports = app => {
    const eventMgr = require("../controllers/eventMgr.controller.js");
  
    // Create a new Event
    app.post("/eventMgrs", eventMgr.create);
  
    // Retrieve all Events
    app.get("/eventMgrs", eventMgr.findAll);
  
    // Retrieve a single Event with eventId
    //app.get("/eventMgrs/:eventId", eventMgr.findEvent);
    
    // Update a Event with eventId
    app.put("/eventMgrs/:eventId", eventMgr.update);
  
    // Delete a Event with eventId
    app.delete("/eventMgrs/:eventId", eventMgr.delete);
  
    // Create a new Event
    app.delete("/eventMgrs", eventMgr.deleteAll);
  };
  