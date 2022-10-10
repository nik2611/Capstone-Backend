const mongoose = require("mongoose");

const DemoVideo = mongoose.model("DemoVideo", new mongoose.Schema({

    courseTitle: {type: String, required: true},
    videoUrl: {type: String, required: true},
    course: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course"
      } 

}));

module.exports = DemoVideo;