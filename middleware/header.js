const header = (req, res, next) => {
  res.header('Access-Control-Allow-Origin: *');
  res.header('Access-Control-Allow-Methods: POST, GET, OPTIONS, PUT, DELETE');
  res.header('Access-Control-Allow-Headers: Origin, Content-Type, Accept, Authorization, X-Request-With');
  next();
};

module.exports = header;
