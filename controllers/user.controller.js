
exports.allAccess = (req, res) => {
  res.status(200).send("Public Content.");
};

  exports.learnerBoard = (req, res) => {
    res.status(200).send("Learner Content.");
  };
  
  exports.educatorBoard = (req, res) => {
    res.status(200).send("Educator Content.");
  };