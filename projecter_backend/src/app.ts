import cors from "cors";
import dotenv from "dotenv";
import express, { Express } from "express";

import authRoutes from "@/routes/AuthRoutes";

// Loads the contents of .env file into process.env to use it.
dotenv.config();

const app: Express = express();
const port: String = process.env.PORT || "8545";

// Built in middleware function in express. https://expressjs.com/en/api.html
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connection to database.
require("./database/Connection");

app.use(cors());

// Routes.
app.use("/user", require("./routes/UserRoutes"));
app.use("/task", require("./routes/TaskRoutes"));
app.use("/auth", authRoutes);
app.use("/project", require("./routes/ProjectRoutes"));

// Start development server.
try {
  app.listen(port, () => {
    console.log(`Server successfully started at port ${port}`);
  });
} catch (err) {
  console.log("Could not start the server", err);
}
