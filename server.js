const express = require("express");
const cors = require("cors");
var https = require('https');
var http = require('http');
const app = express();
const mongoose = require("mongoose");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const port = 8888;
const config = require("config");
var routes = require('./routes/v1');

// const options = {
//   server: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } },
//   replset: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } }
// };

//db connection
mongoose.connect(
  config.dbServer
  // options
);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));

//don't show the log when it is test
if (config.util.getEnv("NODE_ENV") !== "test") {
  //use morgan to log at command line
  app.use(morgan("combined")); //'combined' outputs the Apache style LOGs
}

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/json" }));


routes(app);

http.createServer(app).listen((port), function () { console.log('Listening on ' + port) });



// app.listen((port), function () { console.log('Listening on ' + port) });

// module.exports = app;
