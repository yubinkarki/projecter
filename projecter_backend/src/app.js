const express = require("express");
const cors = require("cors");

// Loads the contents of .env file into process.env to use it.
require("dotenv").config();

const app = express();
const port = process.env.PORT || 8545;

// Built in middleware function in express. https://expressjs.com/en/api.html
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connection to database.
require("./database/Connection");

app.use(cors());

// Routes.
app.use("/user", require("./routes/UserRoutes"));
app.use("/task", require("./routes/TaskRoutes"));
app.use("/auth", require("./routes/AuthRoutes"));
app.use("/project", require("./routes/ProjectRoutes"));

// Start development server.
try {
  app.listen(port, () => {
    console.log(`Server successfully started at port ${port}`);
  });
} catch (err) {
  console.log("Could not start the server", err);
}
