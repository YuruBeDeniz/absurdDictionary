require("dotenv/config");

require("./db");


const express = require("express");

const { isAuthenticated } = require("./middlewares/jwt");

const app = express();

require("./config")(app);


const allRoutes = require("./routes/index.routes");
app.use("/api", allRoutes);

const auth = require("./routes/auth")
app.use("/api/auth", auth);

const entry = require("./routes/entry")
app.use("/api/entry", entry);

const topic = require("./routes/topic")
app.use("/api/topic", topic);

const profile = require("./routes/profile")
app.use("/api/profile", profile);


const path = require('path');
app.use(express.static(path.join(__dirname, "/client/build")));

app.use((req, res) => {
    res.sendFile(__dirname + "/client/build/index.html");
  });

require("./error-handling")(app);

module.exports = app;

