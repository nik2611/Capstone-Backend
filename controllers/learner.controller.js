const db = require("../models");
const User = db.user;


//Learner Board controllers
exports.learnerBoard = (req, res) => {
    res.status(200).send("Learner Content.");
  };