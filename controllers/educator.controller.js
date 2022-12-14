const aws = require("aws-sdk");
const multer = require("multer");
const multerS3 = require("multer-s3");
const db = require("../models");
const DemoVideo = db.demoVideo;
const Course = db.course;
const Schedule = db.schedule;
const User = db.user;

const dotenv = require("dotenv");
const { demoVideo } = require("../models");
dotenv.config();

//Configuration
//AWS S3
const s3 = new aws.S3({
  accessKeyId: process.env.S3_ACCESSKEY_ID,
  secretAccessKey: process.env.S3_SECRET_ACCESSKEY,
  region: process.env.S3_BUCKET_REGION,
});

//Multer
var upload = (fileType1, fileType2, fileSize, fileType3, fileType4) =>
  multer({
    storage: multerS3({
      s3,
      bucket: "dreamlearn-capstone",
      metadata: function (req, file, cb) {
        cb(null, { fieldName: file.fieldname });
      },
      key: function (req, file, cb) {
        cb(null, new Date().toISOString() + file.originalname);
      },
    }),
    limits: {
      fileSize: 1024 * 1024 * fileSize,
    },
    fileFilter: function (req, file, cb) {
      if (file.mimetype === fileType1 || file.mimetype === fileType2 || 
        file.mimetype === fileType3 || file.mimetype === fileType4) {
        cb(null, true);
      } else {
        cb(null, false);
      }
    },
  });

//Educator Board controllers
exports.educatorBoardDemoVideo = (req, res, next) => {
  const uploadVideo = upload("video/mp4", "video/mpeg", 40).single(
    "demoVideo"
  );

  uploadVideo(req, res, (err) => {
    if (err)
      return res.status(400).json({ success: false, message: err.message });


      if (req.file == undefined) {
        return res
          .status(400)
          .json({
            success: false,
            fileFormat: "mp4/mpeg only",
          fileSize: "filesize 40MB Max"
          });
      }


    if (req.body.courseTitle == undefined) {
      res.status(400).json({ success: false, message: "Bad Request" });
    } else {
      Course.findOne(
        {
          title: req.body.courseTitle,
          educator: req.userId
        },
        (err, course) => {
          if (err) {
            res.status(404).json({ message: err });
            return;
          }

          console.log("\nempty", course, "\nobject");

          if (course === null) {
            console.log("\nempty", course, "\nobject");
            return res
              .status(400)
              .json({ success: false, message: "Bad Request" });
          }

          DemoVideo.create(
            {
              courseTitle: course.title,
              videoUrl: req.file.location,
              instrument: course.instrument,
              course: course._id,
              educator: req.userId,
            },
            function (err, demoVideo) {
              if (err) return handleError(err);

              res.status(201).json({
                message: "demoVideo added successfully",
                data: req.file.location,
              });
            }
          );
        }
      );
    }
  });
};

exports.educatorBoardAddCourse = (req, res, next) => {
     
    
  const uploadImageVideo = upload("image/jpeg", "image/png", 45, "video/mp4", "video/mpeg")
  .fields([{name: "image", maxCount: 1}, {name: "video", maxCount: 1}]);

  uploadImageVideo(req, res, (err) => {
    if (err) {
      return res.status(400).json({ success: false, message: err.message });
    }

console.log(req.files);


    if (!req.files.image) {
      return res
        .status(400)
        .json({
          success: false,
          fileFormat: "jpeg/jpg/png only",
          fileSize: "filesize 5MB Max"
        });
    } 


    if (!req.files.video) {
      return res
        .status(400)
        .json({
          success: false,
            fileFormat: "mp4/mpeg only",
          fileSize: "filesize 40MB Max"
        });
    } 


    Course.create({
      videoUrl: req.files.video[0].location,
      imageUrl: req.files.image[0].location,
      title: req.body.title,
      description: req.body.description,
      instrument: req.body.instrument,
      duration: req.body.duration,
      startDate: req.body.startDate,
      endDate: req.body.endDate,
      classDays: req.body.classDays,
      educator: req.userId,
    })
      .then((course) => {

        DemoVideo.create(
          {
            courseTitle: req.body.title,
            videoUrl: req.files.video[0].location,
            instrument: req.body.instrument,
            course: course._id,
            educator: req.userId,
          },
          function (err, demoVideo) {
            if (err) return handleError(err);
    
            console.log("Demo video added successfully");
          }
        );

        console.log("Course added successfully");
        res.status(201).json({
          message: "Course added successfully"
        });
      })
      .catch((error) => {
        console.error(error);
        return res.status(400).send("Error: " + error);
      });
  });
};



exports.educatorBoardAddSchedule = (req, res, next) => {
  console.log("\n", req.body, "\n");

  if(Array.isArray(req.body)){

  if (req.body[0].courseTitle == undefined) {
    return res.status(400).json({ success: false, message: "Course title not defined" });
  } 
     Course.findOne(
      {
        title: req.body[0].courseTitle,
      },
      (err, course) => {
        if (err) {
          return res.status(500).json({ message: err });
        }

        if (course === null) {
          console.log("\nempty", course, "\nobject");
          return res.status(400).json({ success: false, message: "Course is not added yet to add schedule" });
        }  

    for (let i = 0; i < req.body.length; i++) {
        
            Schedule.create({
              courseTitle: req.body[i].courseTitle,
              topic: req.body[i].topic,
              slotStart: req.body[i].slotStart,
              slotEnd: req.body[i].slotEnd,
              date: req.body[i].date,
              course: course._id,
            }
            // ,function (err, schedule) {
            //   if (err) return handleError(err);

            //   console.log({ message: "schedule added successfully" });
              
            // }
            )
              .then(() => {
                console.log({ message: "schedule added successfully" });
              })
              .catch((error) => {
                console.error(error);
                return res.status(500).send("Error: " + error);
              });      
    }
    res.status(201).json({ message: "schedule added successfully" });
  }
  );
  } else {

    if (req.body.courseTitle == undefined) {
      return res.status(400).json({ success: false, message: "Course title not defined" });
    } 
       Course.findOne(
        {
          title: req.body.courseTitle,
        },
        (err, course) => {
          if (err) {
           return res.status(500).json({ message: err });
          }
  
          if (course === null) {
            console.log("\nempty_single", course, "\nbody_object");
            return res.status(400).json({ success: false, message: "Course is not added yet to add schedule" });
          } 
  
        
          Schedule.create({
            courseTitle: req.body.courseTitle,
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
          }
          );
  
          }
};


exports.educatorBoardAddedCourses = (req, res, next) => {
  Course.find(
    {
      educator: req.userId,
    },
    (err, course) => {
      if (err) {
        res.status(404).json({ message: err });
        return;
      }

      if (course === []) {
        console.log("\n", course, "\n");
        return res.status(404).json({ success: false, message: "Not Found" });
      }

      var courses = [];

      for (let i = 0; i < course.length; i++) {
        var obj = { title: course[i].title, image: course[i].imageUrl };
        courses.push(obj);
      }

      if(typeof courses !== 'undefined' && courses.length === 0){
      res.status(200).json({ success: true, message: "No courses added yet!" });
      } else{
        res.status(200).json({ success: true, message: courses });
      }
    }
  );
};


exports.educatorBoardShowDemoVideos = (req, res, next) => {
  DemoVideo.find(
    {
      educator: req.userId,
    },
    (err, demoVideo) => {
      if (err) {
        res.status(404).json({ message: err });
        return;
      }

      if (demoVideo === []) {
        console.log("\n", demoVideo, "\n");
        return res.status(404).json({ success: false, message: "Not Found" });
      }

      var demoVideos = [];

      for (let i = 0; i < demoVideo.length; i++) {
        var obj = {
          courseTitle: demoVideo[i].courseTitle,
          videoUrl: demoVideo[i].videoUrl,
          instrument: demoVideo[i].instrument,
        };
        demoVideos.push(obj);
      }

      res.status(200).json({ success: true, message: demoVideos });
    }
  );
};




exports.educatorBoardShowAddedCourseSchedule = (req, res, next) => {

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
  res.status(500).json({ message: err });
});

}
