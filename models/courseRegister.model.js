const mongoose = require("mongoose");

const CourseReg = mongoose.model("CourseRegister", new mongoose.Schema({

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"},
    course: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course"
      } 

}));

module.exports = CourseReg;