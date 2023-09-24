const sendToken = (user, statusCode, res) => {
  const token = user.getJWTToken();

  const options = {
    httpOnly: true,
  };

  res.status(statusCode).cookie("token", token, options).json({
    status: true,
    token,
  });
};

module.exports = sendToken;
