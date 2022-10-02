const db = require("../models");
const Role = db.role;
const dotenv = require("dotenv");

dotenv.config();

module.exports = async function expmongoose() {
  await db.mongoose
    .connect(process.env.CONN)
    .then(() => {
      console.log("Successfully connected to MongoDB.");
      initial();
    })
    .catch((error) => {
      console.log("Connection error: ", error);
      process.exit();
    });
};

function initial() {
  Role.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      new Role({
        name: "learner",
      })
        .save()
        .then((result) => {
          console.log("added 'learner' to roles collection");
          console.log(result);
        })
        .catch((err) => {
          console.log("error", err);
        });

      new Role({
        name: "educator",
      })
      .save()
      .then(result => {
        console.log("added 'educator' to roles collection");
          console.log(result);
      })
      .catch(err => {
        console.log("error", err);
      });
    }
  });
}
