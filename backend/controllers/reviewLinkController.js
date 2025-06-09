import ReviewLink from "./../models/ReviewLink.js";
import BusinessProfile from "./../models/BusinessProfile.js";
import catchAsync from "./../utils/catchAsync.js";
import appError from "./../utils/appError.js";
import AppError from "./../utils/appError.js";

export const addReviewLink = catchAsync(async (req, res, next) => {
  const { id: businessProfileId } = req.params;
  const { url, siteName, siteLogo } = req.body;

  if (!mongoose.Types.ObjectId.isValid(businessProfileId)) {
    return next(new AppError("Invalid business profile ID", 400));
  }

  if (businessProfileId !== req.user.businessProfileId.toString()) {
    return next(
      new AppError(
        "You are not authorised to add a review link! Please log in.",
        403
      )
    );
  }

  if (!url || !siteName) {
    return next(new AppError("Please fill in the required fields", 400));
  }

  const reviewLink = await ReviewLink.create({
    url,
    siteName,
    siteLogo,
    businessProfileId,
  });

  res.status(201).json({
    status: "success",
    data: {
      reviewLink,
    },
  });
});
