import jsonwebtoken from "jsonwebtoken";

const authRequired = (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    return res.status(401).json({ message: "No token authorization denied" });
  }
  jsonwebtoken.verify(token, process.env.TOKEN_SECRET, (error, user) => {
    if (error) {
      return res.status(303).json({ message: "Invalid token" });
    }
    //console.log(user);
    req.user = user;
    //next();
  });
  next();
};

export { authRequired };
