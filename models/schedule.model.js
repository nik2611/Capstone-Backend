const mongoose = require("mongoose");

const Schedule = mongoose.model("Schedule", new mongoose.Schema({

    topic: {type: String, required: true},
    time: {type: Number},
    date: [Date],
    course: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course"
      } 

}));

module.exports = Schedule;