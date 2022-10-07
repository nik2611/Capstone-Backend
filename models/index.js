const mongoose = require('mongoose');
//mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

db.user = require("./user.model");
db.role = require("./role.model");
db.course = require("./course.model");
db.schedule = require("./schedule.model");
db.demoVideo = require("./demoVideo.model");
db.courseRegister = require("./courseRegister.model");

db.ROLES = ["learner", "educator"];

module.exports = db;