const mongoose = require("mongoose");


const User = mongoose.model(
  "User",
  new mongoose.Schema({
    name: {type: String, required: true},
    username: { type: String, required: true, lowercase: true, trim: true},
    email: { type: String, required: true, 
        match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
        lowercase: true, trim: true},
    password: { type: String, required: true},
    role: 
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Role"
      } 
      // Roles: {
      //   type: String, 
      //   enum: ["learner", "educator"],
      //   default: "learner"
      // }
  })
);

module.exports = User;