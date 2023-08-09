const express = require("express");
const mongoose = require("mongoose");
const users = require("./routes/api/users");
const profile = require("./routes/api/profile");
const posts = require("./routes/api/posts");
const passport = require("passport");

const app = express();

//DB Keys Config
const db = require("./config/keys").mongoURI;

mongoose.set("strictQuery", false);
// Connect to DB
mongoose
  .connect(db)
  .then(() => console.log("MongoDb connected"))
  .catch((err) => console.log(err));

//Body parser
app.use(express.urlencoded({ extended: true }));
app.use(express.json()); // To parse the incoming requests with JSON payloads

// Passport Middleware
app.use(passport.initialize());

// Passport config
require("./config/passport")(passport);

//User Routes
app.use("/api/users", users);
app.use("/api/profile", profile);
app.use("/api/posts", posts);

const port = process.env.port || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));
