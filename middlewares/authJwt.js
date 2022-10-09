const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const db = require("../models");
const User = db.user;
const Role = db.role;

verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send({ message: "No token provided!" });
  }

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: "Unauthorized!" });
    }
    req.userId = decoded.id;
    console.log(req.userId);
    next();
  });
};

isLearner = (req, res, next) => {
  User.findById(req.userId).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    console.log(user);

    Role.find(
      {
        _id: user.role
      },
      (err, role) => {
        
        if (err) {
          res.status(500).send({ message: err });
          return;
        }

        console.log(role); 

          if (role[0].name === "learner") {
            console.log(role.name);
            next();
            return;
          }
        

          return res.status(403).json({ message: "Learner Role Required!" });
      }
    );
  });
};

isEducator = (req, res, next) => {
  User.findById(req.userId).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    console.log(user);

    Role.find(
      {
        _id: user.role
      },
      (err, role) => {
        
        if (err) {
          res.status(500).send({ message: err });
          return;
        }

        console.log(role);

          if (role[0].name === "educator") {
            //console.log(role[0].name);
            next();
            return;
          }

          return res.status(200).json({ message: "Educator Role Required!" });
        
      }
    );
  });
};

const authJwt = {
  verifyToken,
  isLearner,
  isEducator
};
module.exports = authJwt;