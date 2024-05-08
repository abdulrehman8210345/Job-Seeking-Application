export const sendToken = (user, res, statuscode, message) => {
  const token = user.generateToken();
  const option = {
    expires: new Date(
      Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
    secure: true,
    sameSite: "None",
  };

  res.status(statuscode).cookie("token", token, option).json({
    success: true,
    message,
    token,
    user,
  });
};
