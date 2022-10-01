const express = require("express");
const cors = require("cors");
const mongoose = require("./config/db.config");

//Configuration
var corsOptions = {
  origin: "http://localhost:8081"
};

const PORT = process.env.PORT || 8080;
dotenv.config();
mongoose();


//App Initialisation
const app = express();


//App Middlewares
app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));


// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to DreamLearn application." });
});


// App Listen for requests
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});