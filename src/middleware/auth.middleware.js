const jwt = require("jsonwebtoken");
const ErrorResponse = require("../utils/errorResponse");
const empModel = require("../models/emp.model");

// Protect routes
exports.protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  console.log("token::", token);
  // else if (req.cookies.token) {
  //   token = req.cookies.token
  // }

  // Make sure token exists
  if (!token) {
    return next(new ErrorResponse("11Not authorize to access this route", 401));
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, "saipraveen123");

    console.log("Decoded: ", decoded);
    req.user = await empModel.findById(decoded.id);
    next();
  } catch (err) {
    next(new ErrorResponse("32Not authorize to access this route", 401));
  }
};
