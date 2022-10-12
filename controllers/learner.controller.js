const { demoVideo } = require("../models");
const db = require("../models");
const User = db.user;
const DemoVideo = db.demoVideo;


//Learner Board controllers
exports.learnerBoardHomePage = (req, res, next) => {
  
  DemoVideo.find()
  .select("educator videoUrl instrument -_id")
  .populate({path:'educator',select:'name -_id'})
  .exec()
  .then(demoVideo => {
  
    console.log("\ndemo", demoVideo, "\nVideo");

        if (typeof demoVideo !== 'undefined' && demoVideo.length === 0) {
          console.log("\ndemo", demoVideo, "\nVideo");
          return res.status(404).json({ success: false, message: "Not Found" });
        }

        var demoVideos = [];
  
        for (let i = 0; i < demoVideo.length; i++) {

              var obj = {
                educator: demoVideo[i].educator.name,
                videoUrl: demoVideo[i].videoUrl,
                instrument: demoVideo[i].instrument,
              };
              demoVideos.push(obj);
               
                    
        }
        res.status(200).json({ success: true, message: demoVideos }); 
  })
  .catch(err => {
    console.log(err);
    res.status(404).json({ message: err });
  });

}; 