import User from "./../models/User.js";
import jwt from "jsonwebtoken";

const signToken = (id) => {
  return jwt.sign(
    {
      id,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRES_IN,
    }
  );
};

const createSendToken = (user, statusCode, res) => {
  const token = signToken(user._id);
  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };

  if (process.env.NODE_ENV === "production") cookieOptions.secure = true;

  res.cookie("jwt", token, cookieOptions);

  user.password = undefined;

  res.status(statusCode).json({
    status: "success",
    token,
    data: {
      user,
    },
  });
};

export const registerUser = async (req, res, next) => {
  try {
    const { email, password, passwordConfirm } = req.body;

    if (!email || !password || !passwordConfirm) {
      return res.status(400).json({
        status: "fail",
        message: "Please fill in all the required fields",
      });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        status: "fail",
        message: "User with this email already exists",
      });
    }

    const newUser = new User({ email, password, passwordConfirm });
    await newUser.save();

    createSendToken(newUser, 201, res);
  } catch (error) {
    console.error(error.message || error);
    res.status(400).json({
      status: "fail",
      message: error.message || "Something went wrong!",
    });
  }
};

export const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        status: "fail",
        message: "Please fill in all the required fields",
      });
    }

    const user = await User.findOne({ email }).select("+password");

    if (!user || !(await user.correctPassword(password))) {
      return res.status(401).json({
        status: "fail",
        message: "Incorrect email or password",
      });
    }

    createSendToken(user, 200, res);
  } catch (error) {
    console.error(error.message || error);
    res.status(400).json({
      status: "fail",
      message: error.message || "Something went wrong!",
    });
  }
};
