const aws = require("aws-sdk");
const multer = require("multer");
const multerS3 = require("multer-s3");
const db = require("../models");
const User = db.user;


//Configuration
//AWS S3
const s3 = new aws.S3({
  accessKeyId: process.env.S3-ACCESS-KEY,
  secretAccessKey: process.env.S3-SECRET-ACCESS-KEY,
  region: process.env.S3-BUCKET-REGION,
});

//Multer
var upload = (fileType1, fileType2, fileSize) => multer({
  storage: multerS3({
    s3,
    bucket: dreamlearn-capstone,
    metadata: function (req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key: function (req, file, cb) {
      cb(null, new Date().toISOString() + file.originalname);
    },
  }),
  limits: {
    fileSize: 1024 * 1024 * fileSize
  },
  fileFilter: function (req, file, cb) {
    if (file.mimetype === fileType1 || file.mimetype === fileType2) {
      cb(null, true);
    } else {
      cb(null, false);
    }
  }
});


//Public content controllers
exports.allAccess = (req, res) => {
  res.status(200).send("Public Content.");
};


//Learner Board controllers
  exports.learnerBoard = (req, res) => {
    res.status(200).send("Learner Content.");
  };
  

  //Educator Board controllers
  exports.educatorBoardDemoVideo = (req, res, next) => {

    res.status(200).send("Educator Content.");

    const uploadSingle = upload("video/mp4", "video/mpeg", 40).single(
      "demoVideo"
    );
  
    uploadSingle(req, res, async (err) => {
      if (err)
        return res.status(400).json({ success: false, message: err.message });
  
      await User.create({ videoUrl: req.file.location });
  
      res.status(200).json({ data: req.file.location });
    });
  }; 


  exports.educatorBoardImage = (req, res, next) => {

    res.status(200).send("Educator Content.");

    const uploadSingle = upload("image/jpeg", "image/png", 5).single(
      "image"
    );
  
    uploadSingle(req, res, async (err) => {
      if (err)
        return res.status(400).json({ success: false, message: err.message });
  
      await User.create({ photoUrl: req.file.location });
  
      res.status(200).json({ data: req.file.location });
    });
  };