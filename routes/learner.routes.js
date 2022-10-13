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
  
app.use([authJwt.verifyToken, authJwt.isLearner]);

  app.get(
    "/api/learner/HomePage",
    controller.learnerBoardHomePage
  );

  app.get(
    "/api/learner/InstrumentCourses/:instrument",
    controller.learnerBoardInstrumentCourses
  );

  app.get(
    "/api/learner/DetailedCourseInfo/:courseTitle",
    controller.learnerBoardDetailedCourseInfo
  );

  app.get(
    "/api/learner/RegisterCourse/:courseID",
    controller.learnerBoardRegisterCourse
  );

  app.get(
    "/api/learner/RegisteredCourses",
    controller.learnerBoardRegisteredCourses
  );

  app.get(
    "/api/learner/RegisteredCoursesSchedule/:courseTitle",
    controller.learnerBoardRegisteredCoursesSchedule
  );

};