module.exports = app => {
    const eventNote = require("../controllers/eventNote.controller.js");
  
    // Create a new Event Note
    app.post("/eventNotes", eventNote.create);
  
    // Retrieve all Event Notes
    app.get("/eventNotes", eventNote.findAll);
  
    // Retrieve a single Event NOte with eventId
    //app.get("/eventNotes/:eventId", eventNote.findEvent);
    
    // Update a Event Note with eventId
    app.put("/eventNotes/:eventId", eventNote.update);
  
    // Delete a Event Note with eventId
    app.delete("/eventNotes/:eventId", eventNote.delete);
  
    // Delete all event notes
    app.delete("/eventNotes", eventNote.deleteAll);
  };
  