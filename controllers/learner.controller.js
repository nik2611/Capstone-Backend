const { demoVideo } = require("../models");
const db = require("../models");
const User = db.user;
const DemoVideo = db.demoVideo;


//Learner Board controllers
exports.learnerBoardHomePage = (req, res, next) => {
  
  DemoVideo.find()
  .select("educator videoUrl instrument")
  .exec()
  .then(demoVideo => {
  
    console.log("\ndemo", demoVideo, "\nVideo");

        if (demoVideo === []) {
          console.log("\ndemo", demoVideo, "\nVideo");
          return res.status(404).json({ success: false, message: "Not Found" });
        }

        var demoVideos = [];
  
        for (let i = 0; i < demoVideo.length; i++) {

          User.findOne({_id: demoVideo[i].educator}, (err, educator) => {
            if (err) {
              res.status(404).json({ message: err });
              return;
            }
  
            // console.log("\nedu", educator, "\ncator");
  
            // if (educator === null) {
            //   console.log("\nche", educator, "ck\n");
            //   return res
            //     .status(500)
            //     .json({ success: false, message: "Internal server error" });
            // } 

              var obj = {
                educator: educator.name,
                videoUrl: demoVideo[i].videoUrl,
                instrument: demoVideo[i].instrument,
              };
              demoVideos.push(obj);
              res.status(200).json({ success: true, message: demoVideos });  
          });          
        }
        
  })
  .catch(err => {
    console.log(err);
    res.status(404).json({ message: err });
  });

}; 