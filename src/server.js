const { debug } = require("console");
const app = require("./app");
const http = require("http");
const mongoose = require("mongoose");

require("dotenv");

const linksRoutes = require("./routes/linksRoutes");
const authRoutes = require("./routes/authRoutes");
const dayreadRoutes = require("./routes/dayreadRoutes");

const middleware = require("./middleware/errors");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;

mongoose
  .connect(process.env.MONGO_URL)
  .then((res) => {
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
    app.use("/dayreads", dayreadRoutes);

    const server = http.createServer(app);
    server.on("error", onError);
    server.on("listening", onListening);

    server.listen(port);

    app.use(middleware);

    passport.use(
      new GoogleStrategy(
        {
          clientID: process.env.GOOGLE_CLIENT_ID,
          clientSecret: process.env.GOOGLE_CLIENT_SECRET,
          callbackURL: "/auth/google/callback",
        },
        (accessToken) => {
          console.log(accessToken);
        }
      )
    );
  })
  .catch((err) => {
    console.error("could not connect mongodb: " + err);
  });
