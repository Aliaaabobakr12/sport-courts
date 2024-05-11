const authorizeUser = (req, res, next) => {
  // Check user role or permissions to determine authorization
  // For example, if user role is 'admin', they have access, otherwise deny access
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Forbidden" });
  }
  next();
};

module.exports = { authorizeUser };
