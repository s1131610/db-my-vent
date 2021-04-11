module.exports = app => {
    const svcProvNote = require("../controllers/svcProvNote.controller.js");
  
    // Create a new Event Note
    app.post("/svcProvNotes", svcProvNote.create);
  
    // Retrieve all Event Notes
    app.get("/svcProvNotes", svcProvNote.findAll);
  
    // Retrieve a single Event NOte with eventId
    //app.get("/svcProvNotes/:eventId", svcProvNote.findEvent);
    
    // Update a Event Note with eventId
    app.put("/svcProvNotes/:eventId", svcProvNote.update);
  
    // Delete a Event Note with eventId
    app.delete("/svcProvNotes/:eventId", svcProvNote.delete);
  
    // Delete all event notes
    app.delete("/svcProvNotes", svcProvNote.deleteAll);
  };
  