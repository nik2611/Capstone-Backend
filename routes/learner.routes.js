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

  app.get(
    "/api/authorise/learnerInstrumentCourses",
    [authJwt.verifyToken, authJwt.isLearner],
    controller.learnerBoardInstrumentCourses
  );


};