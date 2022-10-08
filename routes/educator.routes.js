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
    "/api/authorise/educator/addDemoVideo",
    [authJwt.verifyToken, authJwt.isEducator],
    controller.educatorBoardDemoVideo
  );

  app.post(
    "/api/authorise/educator/uploadImage",
    [authJwt.verifyToken, authJwt.isEducator],
    controller.educatorBoardImage
  );

 
};