const { authJwt } = require("../middlewares");
const controller = require("../controllers/user.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
  

  app.get(
    "/api/test/educator",
    [authJwt.verifyToken, authJwt.isEducator],
    controller.educatorBoard
  );

  app.get(
    "/api/test/learner",
    [authJwt.verifyToken, authJwt.isLearner],
    controller.learnerBoard
  );
};