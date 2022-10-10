const aws = require("aws-sdk");
const multer = require("multer");
const multerS3 = require("multer-s3");
const db = require("../models");
const DemoVideo = db.demoVideo;
const Course = db.course;
const Schedule = db.schedule;

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
var upload = (fileType1, fileType2, fileSize) =>
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
      if (file.mimetype === fileType1 || file.mimetype === fileType2) {
        cb(null, true);
      } else {
        cb(null, false);
      }
    },
  });

//Educator Board controllers
exports.educatorBoardDemoVideo = (req, res, next) => {
  const uploadSingle = upload("video/mp4", "video/mpeg", 40).single(
    "demoVideo"
  );

  uploadSingle(req, res, (err) => {
    if (err)
      return res.status(400).json({ success: false, message: err.message });

    if (req.body.courseTitle == undefined) {
      res.status(400).json({ success: false, message: "Bad Request" });
    } else {
      Course.findOne(
        {
          title_lower: req.body.courseTitle.toLowerCase()
        },
        (err, course) => {
          if (err) {
            res.status(404).json({ message: err });
            return;
          }

          console.log("\n", course, "\n");

          if (course === null) {
            console.log("\n", course, "\n");
            return res
              .status(400)
              .json({ success: false, message: "Bad Request" });
          }

          DemoVideo.create(
            {
              courseTitle: req.body.courseTitle,
              videoUrl: req.file.location,
              instrument: course.instrument,
              course: course._id,
              educator: req.userId
            },
            function (err, demoVideo) {
              if (err) return handleError(err);

              res
                .status(201)
                .json({
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
  const uploadSingle = upload("image/jpeg", "image/png", 5).single("image");

  uploadSingle(req, res, (err) => {

    if (err) {
      return res.status(400).json({ success: false, message: err.message });
    }      

    if (req.file == undefined) {
      return res.status(400).json({ success: false, message: "Bad Request" });
    }

    Course.create({
      imageUrl: req.file.location,
      title: req.body.title,
      title_lower: req.body.title.toLowerCase(),
      description: req.body.description,
      instrument: req.body.instrument,
      duration: req.body.duration,
      startDate: req.body.startDate,
      endDate: req.body.endDate,
      classDays: req.body.classDays,
      educator: req.userId,
    })
      .then(() => {
        res
          .status(201)
          .json({
            message: "course added successfully",
            data: req.file.location,
          });
      })
      .catch((error) => {
        console.error(error);
        return res.status(500).send("Error: " + error);
      });
  });
};

exports.educatorBoardAddSchedule = (req, res, next) => {
  console.log("\n", req.body[0], "\n");

  for (let i = 0; i < req.body.length; i++) {
    if (req.body[i].courseTitle == undefined) {
      return res.status(400).json({ success: false, message: "Bad Request" });
    } else {
      Course.findOne(
        {
          title_lower: req.body.courseTitle.toLowerCase()
        },
        (err, course) => {
          if (err) {
            res.status(404).json({ message: err });
            return;
          }

          if (course === null) {
            console.log("\n", course, "\n");
            return res
              .status(400)
              .json({ success: false, message: "Bad Request" });
          }

          Schedule.create({
            courseTitle: req.body[i].courseTitle,
            topic: req.body[i].topic,
            slotStart: req.body[i].slotStart,
            slotEnd: req.body[i].slotEnd,
            date: req.body[i].date,
            course: course._id,
          })
            .then(() => {
              console.log({ message: "schedule added successfully" });
            })
            .catch((error) => {
              console.error(error);
              return res.status(500).send("Error: " + error);
            });
        }
      );
    }
  }
  res.status(201).json({ message: "schedule added successfully" });
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

      res.status(200).json({ success: true, message: courses });
    }
  );
};


exports.educatorBoardShowDemoVideos = (req, res, next) => {

  DemoVideo.find(
    {
      educator: req.userId
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
        var obj = { courseTitle: demoVideo[i].courseTitle, videoUrl: demoVideo[i].videoUrl, instrument: demoVideo[i].instrument };
        demoVideos.push(obj);
      }

      res.status(200).json({ success: true, message: demoVideos });
    }
  );

}