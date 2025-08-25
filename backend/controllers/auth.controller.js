import { upsertStreamUser } from "../lib/stream.js";
import User from "../model/User.js";
import jwt from "jsonwebtoken";

export const signup = async (req, res) => {
  const { fullname, email, password } = req.body;

  try {
    if (!fullname || !email || !password) {
      return res.status(400).json({ message: "All fields are required!" });
    }

    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be atleast 6 characters!" });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "Email already exists, please use a diffrent one! " });
    }

    const idx = Math.floor(Math.random() * 100) + 1;
    const randomAvatar = `https://avatar.iran.liara.run/public/${idx}.png`;

    const newUser = await User.create({
      email,
      fullname,
      password,
      profilePic: randomAvatar,
    });

    await newUser.save()
    try {
      await upsertStreamUser({
        id: newUser._id.toString(),
        name: newUser.fullname,
        image: newUser.profilePic || "",
      });
      console.log(`Stream User created for ${newUser.fullname}`);
    } catch (error) {
      console.log("Error creating Stream user", error);
    }

    const token = jwt.sign(
      { userId: newUser._id },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: "7d",
      }
    );

    res.cookie("token", token, {
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
    });

    res.status(200).json({
      success: true,
      message: "User signed in successfully!",
      user: newUser,
    });
  } catch (error) {
    console.log(error)
    console.log(error.message);
    res.status(500).json({ message: "Internal server error!" });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required!" });
    }

    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      return res.status(400).json({ message: "Incorrect email or password!" });
    }

    const isPasswordCorrect = await existingUser.matchPassword(password);

    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Incorrect email or password!" });
    }

    const token = jwt.sign(
      { userId: existingUser._id },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: "7d",
      }
    );

    res.cookie("token", token, {
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
    });

    res.status(200).json({
      success: true,
      message: "User logged in successfully!",
      user: existingUser,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Internal serval error!" });
  }
};

export const logout = async (req, res) => {
  res.clearCookie("token");
  res
    .status(200)
    .json({ success: true, message: "User logged out successfully!" });
};

export const onBoard = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const { fullname, bio, nativeLanguage, learningLanguage, location } =
      req.body;
    if (
      !fullname ||
      !bio ||
      !nativeLanguage ||
      !learningLanguage ||
      !location
    ) {
      return res.status(400).json({
        message: "All fields are required!",
        missingFields: [
          !fullname && "fullname",
          !bio && "bio",
          !nativeLanguage && "nativeLanguage",
          !learningLanguage && "learningLanguage",
          !location && "location",
        ].filter(Boolean),
      });
    }
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        ...req.body,
        isOnboarded: true,
      },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found!" });
    }

    try {
      await upsertStreamUser({
        id: updatedUser._id.toString(),
        name: updatedUser.fullname,
        image: updatedUser.profilePic || "",
      });
      console.log(`Stream User updated for ${updatedUser.fullname}`);
    } catch (streamError) {
      console.log("Error updating Stream user during onBoarding", streamError);
    }

    res.status(200).json({
      success: true,
      message: "User onboarded successfully!",
      user: updatedUser,
    });
  } catch (error) {
    console.log("Onboarding error:", error.message);
    res.status(500).json({ message: "Internal server error!" });
  }
};

export const updateUser = async (req, res, next) => {
  try {
    const userId = req.user._id;
    if (!userId) {
      return res.status(404).json({ message: "User not found!" });
    }

    const { fullname, bio, nativeLanguage, learningLanguage, location } =
      req.body;
    if (
      !fullname ||
      !bio ||
      !nativeLanguage ||
      !learningLanguage ||
      !location
    ) {
      return res.status(400).json({
        message: "All fields are required!",
        missingFields: [
          !fullname && "fullname",
          !bio && "bio",
          !nativeLanguage && "nativeLanguage",
          !learningLanguage && "learningLanguage",
          !location && "location",
        ].filter(Boolean),
      });
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        ...req.body,
      },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found!" });
    }

    try {
      await upsertStreamUser({
        id: updatedUser._id.toString(),
        name: updatedUser.fullname,
        image: updatedUser.profilePic || "",
      });
      console.log(`Stream User updated for ${updatedUser.fullname}`);
    } catch (streamError) {
      console.log("Error updating Stream user during onBoarding", streamError);
    }
    res.status(200).json({
      success: true,
      message: "User updated successfully!",
      user: updatedUser,
    });
  } catch (error) {
    console.log("Updating user error:", error.message);
    res.status(500).json({ message: "Internal server error!" });
  }
};
