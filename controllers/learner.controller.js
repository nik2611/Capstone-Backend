const { demoVideo } = require("../models");
const db = require("../models");
const User = db.user;
const DemoVideo = db.demoVideo;
const Course = db.course;
const CourseRegister = db.courseRegister;

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

        let demoVideos = [];
  
        for (let i = 0; i < demoVideo.length; i++) {

              let obj = {
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


exports.learnerBoardInstrumentCourses = (req, res, next) => {

  Course.find({instrument: req.body.instrument})
  .select("imageUrl title description educator instrument -_id")
  .populate({path:'educator',select:'name -_id'})
  .exec()
  .then(instrumentCourse => {
  
    console.log("\n", instrumentCourse, "\n");

        if (typeof instrumentCourse !== 'undefined' && instrumentCourse.length === 0) {
          console.log("\ndemo", instrumentCourse, "\nVideo");
          return res.status(404).json({ success: false, message: "Not Found" });
        }

        let instrumentCourses = [];
  
        for (let i = 0; i < instrumentCourse.length; i++) {

              let obj = {
                educator: instrumentCourse[i].educator.name,
                imageUrl: instrumentCourse[i].imageUrl,
                instrument: instrumentCourse[i].instrument,
                courseTitle: instrumentCourse[i].title,
                description: instrumentCourse[i].description
              };
              instrumentCourses.push(obj);
               
                    
        }
        res.status(200).json({ success: true, message: instrumentCourses }); 
  })
  .catch(err => {
    console.log(err);
    res.status(404).json({ message: err });
  });
}


exports.learnerBoardDetailedCourseInfo = (req, res, next) => {

  DemoVideo.findOne({courseTitle: req.body.courseTitle})
  .select("videoUrl educator course -_id")
  .populate({path:'course',select:'-educator -__v'})
  .populate({path:'educator',select:'name -_id'})
  .exec()
  .then(courseDetail => {
  
    console.log("\n", courseDetail, "\n");

        if (courseDetail === null) {
          console.log("\ninside", courseDetail, "\nIF");
          return res.status(404).json({ success: false, message: "Not Found" });
        }

        let courseDetails = [];
  
              let obj = {
                courseID: courseDetail.course._id,
                educator: courseDetail.educator.name,
                videoUrl: courseDetail.videoUrl,
                imageUrl: courseDetail.course.imageUrl,
                courseTitle: courseDetail.course.title,
                description: courseDetail.course.description,
                instrument: courseDetail.course.instrument,
                duration: courseDetail.course.duration,
                startDate: courseDetail.course.startDate,
                endDate: courseDetail.course.endDate,
                classDays: courseDetail.course.classDays
                
              };

              courseDetails.push(obj);   
              
        
        console.log("\noutside", courseDetails, "loop\n");
        res.status(200).json({ success: true, message: courseDetails }); 
  })
  .catch(err => {
    console.log(err);
    res.status(404).json({ message: err });
  });
}


exports.learnerBoardRegisteredCourses = (req, res, next) => {

  
  CourseRegister.create({
    courseT: req.body.courseTitle,
    topic: req.body.topic,
    slotStart: req.body.slotStart,
    slotEnd: req.body.slotEnd,
    date: req.body.date,
    course: course._id,
  })
    .then(() => {
      console.log({ message: "schedule added successfully" });
      res.status(201).json({ message: "schedule added successfully" });
    })
    .catch((error) => {
      console.error(error);
      return res.status(500).send("Error: " + error);
    });


  // Course.find({_id: req.body.instrument})
  // .select("imageUrl title description educator instrument -_id")
  // .populate({path:'educator',select:'name -_id'})
  // .exec()
  // .then(instrumentCourse => {
  
  //   console.log("\n", instrumentCourse, "\n");

  //       if (typeof instrumentCourse !== 'undefined' && instrumentCourse.length === 0) {
  //         console.log("\ndemo", instrumentCourse, "\nVideo");
  //         return res.status(404).json({ success: false, message: "Not Found" });
  //       }

  //       let instrumentCourses = [];
  
  //       for (let i = 0; i < instrumentCourse.length; i++) {

  //             let obj = {
  //               educator: instrumentCourse[i].educator.name,
  //               imageUrl: instrumentCourse[i].imageUrl,
  //               instrument: instrumentCourse[i].instrument,
  //               courseTitle: instrumentCourse[i].title,
  //               description: instrumentCourse[i].description
  //             };
  //             instrumentCourses.push(obj);
               
                    
  //       }
  //       res.status(200).json({ success: true, message: instrumentCourses }); 
  // })
  // .catch(err => {
  //   console.log(err);
  //   res.status(404).json({ message: err });
  // });
}