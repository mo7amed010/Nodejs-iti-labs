const jwt = require("jsonwebtoken");
exports.auth = (req, res, next) => {
  let { authentication } = req.headers;
  if (!authentication) {
    return res.status(401).json({ message: "you must login first" });
  }
  try {
    const decoded = jwt.verify(authentication, process.env.SECRET_KEY);
    req.userId = decoded.id;
    req.role = decoded.role;
    next();
  } catch (err) {
    console.log(err);
    return res.status(401).json({ message: "you must login first" });
  }
};

exports.checkRole = (...roles) => {
  return (req, res, next) => {
    // console.log("req from auth", req.role);

    if (!roles.includes(req.role)) {
      return res.status(403).json({ message: "you dont have permission" });
    } else {
      next();
    }
  };
};
