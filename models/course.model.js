const mongoose = require("mongoose");

const Course = mongoose.model("Course", new mongoose.Schema({

    imageUrl: {type: String, required: true},
    title: {type: String, required: true, unique: true, lowercase: true, trim: true}, //lowercase: true, trim: true
    description: {type:String},
    instrument: {type:String},
    duration: {type:String},
    startDate: String,
    endDate: String,
    classDays: {type:String},
    educator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
      } 

}));

module.exports = Course;