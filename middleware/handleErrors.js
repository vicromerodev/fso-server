module.exports = (error, req, res, next) => {
  console.log(error);
  console.log(error.name);
  if (error.name === "CastError") {
    res.status(400).send({ error: "id used is malformed" });
  } else {
    res.status(500).end();
  }
};
