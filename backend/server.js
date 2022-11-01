const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cors = require("cors");
const errorHandler = require("./middleware/errorHandler");
const corsOptions = require("./config/corsOptions");
require("dotenv").config();
const { PORT } = process.env;

// Cross Origin Resource Sharing
app.use(cors(corsOptions));

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// routes
app.use("/api/users", require("./routes/usersRoute"));

// handling errors
app.use(errorHandler);

app.listen(3500 || PORT, () => console.log("server is running on port 3500"));
