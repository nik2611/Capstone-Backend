const express = require("express");
const cors = require("cors");
const mongoose = require("./config/db.config");
const dotenv = require("dotenv");

//Configuration
var corsOptions = {
  origin: "https://dreamlearn.vercel.app"
};

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

//require('./routes/public.routes')(app);
require('./routes/auth.routes')(app);
require('./routes/educator.routes')(app);
require('./routes/learner.routes')(app);
//require('./routes/public.routes')(app);

// App Listen for requests
const PORT = process.env.PORT || 8085;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});