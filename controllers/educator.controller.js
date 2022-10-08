const aws = require("aws-sdk");
const multer = require("multer");
const multerS3 = require("multer-s3");
const db = require("../models");
const User = db.user;
const dotenv = require("dotenv");
dotenv.config();


//Configuration
//AWS S3
const s3 = new aws.S3({
  accessKeyId: process.env.S3_ACCESSKEY_ID,
  secretAccessKey: process.env.S3_SECRET_ACCESSKEY,
  region: process.env.S3_BUCKET_REGION,
});



//Multer
var upload = (fileType1, fileType2, fileSize) => multer({
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
    fileSize: 1024 * 1024 * fileSize
  },
  fileFilter: function (req, file, cb) {
    if (file.mimetype === fileType1 || file.mimetype === fileType2) {
      cb(null, true);
    } else {
      cb(new Error('Invalid mime type')); 
    }
  }
});
  

  //Educator Board controllers
  exports.educatorBoardDemoVideo = (req, res, next) => {

    const uploadSingle = upload("video/mp4", "video/mpeg", 40).single(
      "demoVideo"
    );
  
    uploadSingle(req, res, (err) => {
      if (err)
        return res.status(400).json({ success: false, message: err.message });
  
      //User.create({ videoUrl: req.file.location });
      
      res.status(200).json({ data: req.file.location });
    });
  }; 


  exports.educatorBoardImage = (req, res, next) => {

    const uploadSingle = upload("image/jpeg", "image/png", 5).single(
      "image"
    );
  
    uploadSingle(req, res,  (err) => {
      if (err)
        return res.status(400).json({ success: false, message: err.message });
  
      //User.create({ photoUrl: req.file.location });
  
      res.status(200).json({ data: req.file.location });
    });
  };