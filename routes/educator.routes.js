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
  
app.use([authJwt.verifyToken, authJwt.isEducator]);

  app.post(
    "/api/educator/addDemoVideo",
    controller.educatorBoardDemoVideo
  );

  app.post(
    "/api/educator/addCourse",
    controller.educatorBoardAddCourse
  );

  app.post(
    "/api/educator/addSchedule",
    controller.educatorBoardAddSchedule
  );

  app.get(
    "/api/educator/addedCourses",
    controller.educatorBoardAddedCourses
  );

  app.get(
    "/api/educator/showDemoVideos",
    controller.educatorBoardShowDemoVideos
  );
};