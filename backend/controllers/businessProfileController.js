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
