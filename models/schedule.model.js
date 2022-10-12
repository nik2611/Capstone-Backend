const mongoose = require("mongoose");

const Schedule = mongoose.model("Schedule", new mongoose.Schema({

    courseTitle: {type: String, required: true}, 
    topic: {type: String, required: true},
    slotStart: {type: String},
    slotEnd: {type: String},
    date: String,
    course: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course"
      } 

}));

module.exports = Schedule;