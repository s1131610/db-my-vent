const express = require("express");
const mysql = require("mysql");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(cors());

app.use(function(req, res, next) {
	console.log("CORS SUCKS!!!");
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE, OPTIONS");
  next();
});

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