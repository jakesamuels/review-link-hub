import User from "./../models/User.js";

export const registerUser = async (req, res, next) => {
  try {
    const { email, password, passwordConfirm } = req.body;

    if (!email || !password || !passwordConfirm) {
      throw new Error("Please fill in all the required fields");
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

    const { password: _, ...userWithoutPassword } = newUser.toObject();

    res.status(201).json({
      status: "success",
      data: {
        user: userWithoutPassword,
      },
    });
  } catch (error) {
    console.error(error.message || error);
    res.status(400).json({
      status: "fail",
      message: error.message || "Something went wrong!",
    });
  }
};
