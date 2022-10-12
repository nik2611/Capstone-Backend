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
    "/api/authorise/learnerHomePage",
    [authJwt.verifyToken, authJwt.isLearner],
    controller.learnerBoardHomePage
  );

  app.post(
    "/api/authorise/learnerInstrumentCourses",
    [authJwt.verifyToken, authJwt.isLearner],
    controller.learnerBoardInstrumentCourses
  );

  app.post(
    "/api/authorise/learnerDetailedCourseInfo",
    [authJwt.verifyToken, authJwt.isLearner],
    controller.learnerBoardDetailedCourseInfo
  );

  app.post(
    "/api/authorise/learnerRegisterCourse",
    [authJwt.verifyToken, authJwt.isLearner],
    controller.learnerBoardRegisterCourse
  );

  app.get(
    "/api/authorise/learnerRegisteredCourses",
    [authJwt.verifyToken, authJwt.isLearner],
    controller.learnerBoardRegisteredCourses
  );

  app.post(
    "/api/authorise/learnerRegisteredCoursesSchedule",
    [authJwt.verifyToken, authJwt.isLearner],
    controller.learnerBoardRegisteredCoursesSchedule
  );
  

  

};
