module.exports = app => {
    const events = require("../controllers/event.controller.js");
  
    // Create a new Event
    app.post("/events/create", events.create);
  
    // Retrieve all Events
    app.get("/events", events.findAll);
  
    // Retrieve a single Event with eventId
    app.get("/events/get/:eventId", events.findEvent);
    
    // Update a Event with eventId
    app.post("/events/update/:eventId", events.update);
  
    // Delete a Event with eventId
    app.delete("/events/delete/:eventId", events.delete);
  
    // Delete all Events
    app.delete("/events", events.deleteAll);
  };
  