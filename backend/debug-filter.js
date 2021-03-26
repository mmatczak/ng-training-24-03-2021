module.exports = (req, res, next) => {
  console.log(req.headers);
  console.log();
  next();
}
