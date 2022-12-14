const { demoVideo, schedule, course, courseRegister } = require("../models");
const db = require("../models");
const User = db.user;
const DemoVideo = db.demoVideo;
const Course = db.course;
const CourseRegister = db.courseRegister;
const Schedule = db.schedule;

//Learner Board controllers
exports.learnerBoardHomePage = (req, res, next) => {
  
  DemoVideo.find()
  .select("educator videoUrl instrument -_id")
  .populate({path:'educator',select:'name -_id'})
  .populate({path:'course',select:'title _id'})
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
                courseTitle: demoVideo[i].course.title,
                courseID: demoVideo[i].course._id
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

  if (req.params.instrument == undefined) {
    return res.status(400).json({ success: false, message: "Bad Request" });
  }
  Course.find({instrument: req.params.instrument})
  .select("imageUrl title description startDate endDate educator instrument -_id")
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
                startDate: instrumentCourse[i].startDate,
                endDate: instrumentCourse[i].endDate
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

  if (req.params.courseTitle == undefined) {
    return res.status(400).json({ success: false, message: "Bad Request" });
  }
  DemoVideo.findOne({courseTitle: req.params.courseTitle})
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
              
        
        console.log("\n", courseDetails, "\n");
        res.status(200).json({ success: true, message: courseDetails }); 
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({ message: err });
  });
}


exports.learnerBoardRegisterCourse = (req, res, next) => {

  console.log("\ncourse", req.params.courseID, "\nID");
  if (req.params.courseID == undefined) {
    return res.status(400).json({ success: false, message: "Bad Request" });
  }

  
  CourseRegister.findOne({user: req.userId,
    course: req.params.courseID})
  .exec()
  .then(courseRegister => {
  
    console.log("\n", courseRegister, "\n");

        if (courseRegister === null) {
          console.log("\ninside", courseRegister, "\nIF");
          
          CourseRegister.create({
            user: req.userId,
            course: req.params.courseID
          })
            .then(() => {
              console.log({ message: "Course registered successfully" });
              res.status(201).json({ success: true, message: "Course registered successfully"}); 
            })
            .catch((error) => {
              console.error(error);
              return res.status(500).json({"Error: " : error});
            });
        } else {
          res.status(400).json({ success: false, message: "Course already registered"});
        }

  })
  .catch(err => {
    console.log(err);
    res.status(404).json({ message: err });
  });

  }



  exports.learnerBoardRegisteredCourses = (req, res, next) => {

  CourseRegister.find({user: req.userId})
  .select("course -_id")
  .populate({path:'course',select:'title -_id'})
  .exec()
  .then(registeredCourse => {
    console.log("\nregistered", registeredCourse, "\ncourses");

    if (typeof registeredCourse !== 'undefined' && registeredCourse.length === 0) {
      console.log("\nregistered", registeredCourse, "\ncourses");
      return res.status(404).json({ success: false, message: "Not Found" });
    }


    let registeredCourses = [];
  
    for(let i=0; i < registeredCourse.length; i++)
    {
              let obj = {
                
                courseTitle: registeredCourse[i].course.title
                
              };

              registeredCourses.push(obj);   
    }
        res.status(200).json({ success: true, message: registeredCourses }); 
      
  })
  .catch(err => {
    console.log(err);
    res.status(404).json({ message: err });
  });  
}


exports.learnerBoardRegisteredCoursesSchedule = (req, res, next) => {

  if (req.params.courseTitle == undefined) {
    return res.status(400).json({ success: false, message: "Bad Request" });
  }
  Schedule.find({courseTitle: req.params.courseTitle})
  .select("topic slotStart slotEnd date -_id")
  .exec()
  .then(schedule => {

    console.log("\nschedule", schedule, "\nschedule");

        if (typeof schedule !== 'undefined' && schedule.length === 0) {
          console.log("\nschedule", schedule, "\nschedule");
          return res.status(404).json({ success: false, message: "Not Found" });
        }

        let schedules = [];
  
        for (let i = 0; i < schedule.length; i++) {

              let obj = {
                topic: schedule[i].topic,
                slotStart: schedule[i].slotStart,
                slotEnd: schedule[i].slotEnd,
                date: schedule[i].date
              };
              schedules.push(obj);    
                    
        }
        res.status(200).json({ success: true, message: schedules }); 
})
.catch(err => {
  console.log(err);
  res.status(404).json({ message: err });
});

}
