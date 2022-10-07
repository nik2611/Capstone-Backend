const mongoose = require("mongoose");

const Course = mongoose.model("Course", new mongoose.Schema({

    imageUrl: {type: String, required: true},
    title: {type: String, required: true, unique: true},
    description: [String],
    instrument: {type:String},
    duration: [String],
    startDate: [Date],
    endDate: [Date],
    classDays: [String],
    educator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
      } 

}));

module.exports = Course;