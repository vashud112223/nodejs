//Handle Auth Middleware for All request
const adminAuth =
  ("/admin",
  (req, res, next) => {
    console.log("Admin auth is checked");
    const token = "xyz";
    const isAuthorized = token === "xyz";
    if (!isAuthorized) {
      res.status(401).send("unauthorized request");
    }

    next();
  });

  const userAuth =
  ("/admin",
  (req, res, next) => {
    console.log("Admin auth is checked");
    const token = "xyz";
    const isAuthorized = token === "xyz";
    if (!isAuthorized) {
      res.status(401).send("unauthorized request");
    }

    next();
  });
module.exports = {
  adminAuth,
  userAuth,
};
