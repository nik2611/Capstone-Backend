const { authJwt } = require("../middlewares");
const controller = require("../controllers/educator.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
  

  app.post(
    "/api/educator/addDemoVideo",
    [authJwt.verifyToken, authJwt.isEducator],
    controller.educatorBoardDemoVideo
  );

  app.post(
    "/api/educator/addCourse",
    [authJwt.verifyToken, authJwt.isEducator],
    controller.educatorBoardAddCourse
  );

  app.post(
    "/api/educator/addSchedule",
    [authJwt.verifyToken, authJwt.isEducator],
    controller.educatorBoardAddSchedule
  );

  app.get(
    "/api/educator/addedCourses",
    [authJwt.verifyToken, authJwt.isEducator],
    controller.educatorBoardAddedCourses
  );

  app.get(
    "/api/educator/showDemoVideos",
    [authJwt.verifyToken, authJwt.isEducator],
    controller.educatorBoardShowDemoVideos
  );
};