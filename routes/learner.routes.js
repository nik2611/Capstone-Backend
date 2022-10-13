const { authJwt } = require("../middlewares");
const controller = require("../controllers/learner.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
  


  app.get(
    "/api/learner/HomePage", 
    [authJwt.verifyToken, authJwt.isLearner],
    controller.learnerBoardHomePage
  );

  app.get(
    "/api/learner/InstrumentCourses/:instrument", 
    [authJwt.verifyToken, authJwt.isLearner],
    controller.learnerBoardInstrumentCourses
  );

  app.get(
    "/api/learner/DetailedCourseInfo/:courseTitle", 
    [authJwt.verifyToken, authJwt.isLearner],
    controller.learnerBoardDetailedCourseInfo
  );

  app.get(
    "/api/learner/RegisterCourse/:courseID", 
    [authJwt.verifyToken, authJwt.isLearner],
    controller.learnerBoardRegisterCourse
  );

  app.get(
    "/api/learner/RegisteredCourses", 
    [authJwt.verifyToken, authJwt.isLearner],
    controller.learnerBoardRegisteredCourses
  );

  app.get(
    "/api/learner/RegisteredCoursesSchedule/:courseTitle", 
    [authJwt.verifyToken, authJwt.isLearner],
    controller.learnerBoardRegisteredCoursesSchedule
  );

};