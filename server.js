const express = require("express");
const mysql = require("mysql");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended:true}));

// simple route
app.get("/",(req,res) => {
    res.json({ message : "Welcome to Justins Application."});
});

require("./app/routes/user.routes.js")(app);
require("./app/routes/event.routes.js")(app);
require("./app/routes/eventMgr.routes.js")(app);
require("./app/routes/eventNote.routes.js")(app);
require("./app/routes/serviceProvider.routes.js")(app);
require("./app/routes/serviceType.routes.js")(app);
require("./app/routes/svcProvNote.routes.js")(app);
require("./app/routes/serviceOffered.routes.js")(app);

// set port, listen for requests
app.listen(3309,()=> {
    console.log("Server is running on port 3309");
});