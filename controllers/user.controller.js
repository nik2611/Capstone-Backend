const aws = require("aws-sdk");
const multer = require("multer");
const multerS3 = require("multer-s3");

//Configuration

const s3 = new aws.S3({
  accessKeyId: process.env.S3-ACCESS-KEY,
  secretAccessKey: process.env.S3-SECRET-ACCESS-KEY,
  region: process.env.S3-BUCKET-REGION,
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
  exports.educatorBoardDemoVideo = (req, res) => {

    res.status(200).send("Educator Content.");


    multer({
      storage: multerS3({
        s3,
        bucket: dreamlearn-capstone,
        metadata: function (req, file, cb) {
          cb(null, { fieldName: file.fieldname });
        },
        key: function (req, file, cb) {
          cb(null, Date.now().toString());
        },
      }),
    });



  };