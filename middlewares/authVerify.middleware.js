const jwt = require("jsonwebtoken");
const mySecret = process.env['TOKEN_KEY'];
const authVerify = (req, res, next) => {
  // const token = req.headers.authorization;
  const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyaWQiOiI2MGVhNjJjMWVkNDY2NjAwMjM0MmMxY2UiLCJpYXQiOjE2MjU5NzY0MjQsImV4cCI6MTYyNjA2MjgyNH0.shKq9UiERmVcln2Orx-fXgWSwsxGgiDk_olnVsVsLoU";
  try {
    let decoded = jwt.verify(token, mySecret);
    req.user = {userid:decoded.userid};
    return next();
  } catch (err) {
    console.log("token error")
    res.status(401).json({ message: "Unauthorized access,token not valid" });
  }
}

module.exports = { authVerify }