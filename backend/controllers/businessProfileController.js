import mongoose from "mongoose";
import BusinessProfile from "./../models/BusinessProfile.js";
import User from "./../models/User.js";
import catchAsync from "./../utils/catchAsync.js";
import AppError from "./../utils/appError.js";

export const createBusinessProfile = catchAsync(async (req, res, next) => {
  const { name, logoUrl, description, industry } = req.body;
  const userId = req.user._id;

  const hasProfile = await BusinessProfile.findOne({ ownerId: userId });

  if (hasProfile) {
    return next(new AppError("Business can only have one profile", 400));
  }

  const businessProfile = await BusinessProfile.create({
    name,
    logoUrl,
    description,
    industry,
    ownerId: userId,
  });

  await User.findByIdAndUpdate(userId, {
    businessProfileId: businessProfile._id,
  });

  res.status(201).json({
    status: "success",
    data: {
      businessProfile,
    },
  });
});

export const getBusinessProfileById = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return next(new AppError("Invalid profile ID", 400));
  }

  const businessProfile = await BusinessProfile.findById(id).populate(
    "ownerId",
    "email"
  );

  if (!businessProfile) {
    return next(new AppError("No profile found", 404));
  }

  res.status(200).json({
    message: "success",
    data: {
      businessProfile,
    },
  });
});

export const getLoggedInUserBusinessProfile = catchAsync(
  async (req, res, next) => {
    const userId = req.user._id;

    const businessProfile = await BusinessProfile.findOne({
      ownerId: userId,
    }).populate("ownerId", "email");

    if (!businessProfile) {
      return next(new AppError("No profile found", 404));
    }

    res.status(200).json({
      message: "success",
      data: {
        businessProfile,
      },
    });
  }
);
