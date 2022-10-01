const db = require("./models");

module.exports = async function expmongoose() {
  await db.mongoose
    .connect(process.env.CONN)
    .then(() => {
      console.log("Successfully connected to MongoDB.");
      //initial();
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
          console.log(result);
          res.status(201).json({
            message: "learner role created",
          });
        })
        .catch((err) => {
          console.log(err);
          res.status(500).json({
            error: err,
          });
        });

      new Role({
        name: "educator",
      })
      .save()
      .then(result => {
        console.log(result);
        res.status(201).json({
          message: "educator role created"
        });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      });
    }
  });
}
