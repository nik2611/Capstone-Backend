const db = require("../models");
const ROLES = db.ROLES;
const User = db.user;

checkDuplicateUsernameOrEmail = (req, res, next) => {

  console.log("SIGN_UP REQ BODY", req.body);
  // Username Validation
  // User.findOne({
  //   username: req.body.username
  // })
  // .exec()
  // .then(user => {
  //   if (user !== null) {
  //     return res.status(409).json({
  //       message: "Username exists"
  //     });
  //   }
  // })
  // .catch(err => {
  //   console.log(err);
  //   return res.status(500).json({
  //     error: err
  //   });
  // });

  //   // Email Validation
  //   User.findOne({
  //     email: req.body.email
  //   })
  //   .exec()
  //   .then(user => {
  //     if (user !== null) {
  //       return res.status(409).json({
  //         message: "Email exists"
  //       });
  //     }
  //   })
  //   .catch(err => {
  //     console.log(err);
  //     return res.status(500).json({
  //       error: err
  //     })
  //   });

  //     next();
  //   };


  User.findOne({
    username: req.body.username
  }).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    if (user) {
      res.status(400).send({ message: "Failed! Username is already in use!" });
      return;
    }

    // Email
    User.findOne({
      email: req.body.email
    }).exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      if (user) {
        res.status(400).send({ message: "Failed! Email is already in use!" });
        return;
      }

      next();
    });
  });
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