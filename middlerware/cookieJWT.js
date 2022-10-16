const jwt = require("jsonwebtoken");

exports.cookieJwtAuth = (req, res, next) => {
  const token = req.cookies.token;
  try {
    var ketqua = jwt.verify(token, process.env.JWT_KEY);
    if(ketqua){
    
        next();
    }
  } catch (err) {
    res.clearCookie("token");
    return res.redirect("/");
  }
};