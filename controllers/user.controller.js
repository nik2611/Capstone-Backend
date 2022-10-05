const aws = require("aws-sdk");
const multer = require("multer");
const multerS3 = require("multer-s3");



exports.allAccess = (req, res) => {
  res.status(200).send("Public Content.");
};

  exports.learnerBoard = (req, res) => {
    res.status(200).send("Learner Content.");
  };
  

  //Educator Board controllers
  exports.educatorBoardDemoVideo = (req, res) => {

    res.status(200).send("Educator Content.");

    const s3 = new aws.S3({
      accessKeyId: process.env.S3-ACCESS-KEY,
      secretAccessKey: process.env.S3-SECRET-ACCESS-KEY,
      region: process.env.S3-BUCKET-REGION,
    });



  };