const mongoose = require("mongoose");

const DemoVideo = mongoose.model("DemoVideo", new mongoose.Schema({

    videoUrl: {type: String, required: true},
    course: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course"
      } 

}));

module.exports = DemoVideo;