const adminMiddleware = (req, res, next) => {

  if (req.user && req.user.role === "admin") {

    next(); // admin allowed

  } else {

    res.status(403).json({ msg: "Admin access required" });

  }

};

module.exports = adminMiddleware;