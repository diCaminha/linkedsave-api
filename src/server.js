const { debug } = require("console");
const app = require("./app");
const http = require("http");
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

const linksRoutes = require("./routes/linksRoutes");
const authRoutes = require("./routes/authRoutes");

const normalizePort = (val) => {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    return val;
  }

  if (port >= 0) {
    return port;
  }

  return false;
};

const onError = (error) => {
  if (error.syscall !== "listen") {
    throw error;
  }
  const bind = typeof addr === "string" ? "pipe " + addr : "port " + port;
  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(bind + " is already in use");
      process.exit(1);
      break;
    default:
      throw error;
  }
};

const onListening = () => {
  const addr = server.address();
  const bind = typeof addr === "string" ? "pipe " + addr : "port " + port;
  debug("Listening on " + bind);
};

const port = normalizePort(process.env.PORT || "3000");
app.set("port", port);

//add routes
app.use("/links", linksRoutes);
app.use("/auth", authRoutes);

const server = http.createServer(app);
server.on("error", onError);
server.on("listening", onListening);


mongoose
  .connect(process.env.MONGO_URL)
  .then((res) => {
    server.listen(port);
  })
  .catch((err) => {
    console.error("could not connect mongodb: " + err);
  });
