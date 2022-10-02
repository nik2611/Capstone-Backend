const config = require("../config/auth.config");
const db = require("../models");
const User = db.user;
const Role = db.role;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.signup = (req, res) => {
  const user = new User({
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8)
  });

  user.save((err, user) => {
    if (err) {
      res.status(500).json({ message: err });
      return;
    }

    console.log(user);

    if (req.body.role) {
      Role.find(
        {
          name: req.body.role
        },
        (err, role) => {
          if (err) {
            res.status(500).json({ message: err });
            return;
          }

          console.log(role);

          user.role = role[0]._id;
          user.save(err => {
            if (err) {
              res.status(500).send({ message: err });
              return;
            }

            res.status(200).json({ message: "User was registered successfully!" });
          });
        }
      );
    } else {
        res.status(500).send({ message: "Internal Server Error"});
        return;
    }
  });
};

exports.signin = (req, res) => {
  User.findOne({
    username: req.body.username
  })
    .populate("role", "-__v")
    .exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }

      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!"
        });
      }

      var token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: 1800 // 30 mins
      });

      var authority = "ROLE_" + user.role.name.toUpperCase();

      
      res.status(200).send({
        id: user._id,
        username: user.username,
        email: user.email,
        role: authority,
        accessToken: token
      });
    });
};