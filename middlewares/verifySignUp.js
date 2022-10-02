const db = require("../models");
const ROLES = db.ROLES;
const User = db.user;

checkDuplicateUsernameOrEmail = (req, res, next) => {
  // Username Validation
  User.findOne({
    username: req.body.username
  })
  .exec()
  .then(user => {
    if (user.length >= 1) {
      return res.status(409).json({
        message: "Username exists"
      });
    }
  })
  .catch(err => {
    console.log(err);
    return res.status(500).json({
      error: err
    });
  });

    // Email Validation
    User.findOne({
      email: req.body.email
    })
    .exec()
    .then(user => {
      if (user.length >= 1) {
        return res.status(409).json({
          message: "Email exists"
        });
      }
    })
    .catch(err => {
      console.log(err);
      return res.status(500).json({
        error: err
      })
    });

      next();
    };


checkRolesExisted = (req, res, next) => {
  if (req.body.role) {
      if (!ROLES.includes(req.body.role)) {
        return res.status(400).json({
          message: `Failed! Role ${req.body.role} does not exist!`
        });
        
      }
    } else {
      return res.status(400).json({
        message: `Bad Request`
      });
    }
  

  next();
};

const verifySignUp = {
  checkDuplicateUsernameOrEmail,
  checkRolesExisted
};

module.exports = verifySignUp;