import ReviewLink from "./../models/ReviewLink.js";
import BusinessProfile from "./../models/BusinessProfile.js";
import catchAsync from "./../utils/catchAsync.js";
import appError from "./../utils/appError.js";
import AppError from "./../utils/appError.js";
import mongoose from "mongoose";

export const addReviewLink = catchAsync(async (req, res, next) => {
  const { businessProfileId } = req.params;
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

export const updateReviewLink = catchAsync(async (req, res, next) => {
  const { id: reviewLinkId } = req.params;
  const { url, siteName, siteLogo } = req.body;

  if (!mongoose.Types.ObjectId.isValid(reviewLinkId)) {
    return next(new AppError("Invalid review ID", 400));
  }

  const reviewLink = await ReviewLink.findById(reviewLinkId);

  if (!reviewLink) {
    return next(new AppError("No review link found", 404));
  }

  const businessProfile = await BusinessProfile.findById(
    reviewLink.businessProfileId
  );

  if (
    !businessProfile ||
    businessProfile.ownerId.toString() !== req.user._id.toString()
  ) {
    return next(
      new AppError(
        "You are not authorised to update this review link! Please log in.",
        403
      )
    );
  }

  const updatedReviewLink = await ReviewLink.findByIdAndUpdate(
    reviewLinkId,
    {
      url,
      siteName,
      siteLogo,
    },
    { new: true, runValidators: true }
  );

  res.status(200).json({
    status: "success",
    data: {
      reviewLink: updatedReviewLink,
    },
  });
});

export const deleteReviewLink = catchAsync(async (req, res, next) => {
  const { id: reviewLinkId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(reviewLinkId)) {
    return next(new AppError("Invalid review ID", 400));
  }

  const reviewLink = await ReviewLink.findById(reviewLinkId);

  if (!reviewLink) {
    return next(new AppError("No review link found", 404));
  }

  const businessProfile = await BusinessProfile.findById(
    reviewLink.businessProfileId
  );

  if (
    !businessProfile ||
    businessProfile.ownerId.toString() !== req.user._id.toString()
  ) {
    return next(
      new AppError(
        "You are not authorised to delete this review link! Please log in.",
        403
      )
    );
  }

  await ReviewLink.findByIdAndDelete(reviewLinkId);

  res.status(204).send();
});

export const getReviewLinksByBusinessProfile = catchAsync(
  async (req, res, next) => {
    const { businessProfileId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(businessProfileId)) {
      return next(new AppError("Invalid business profile ID", 400));
    }

    const businessProfileExists = await BusinessProfile.exists({
      _id: businessProfileId,
    });

    if (!businessProfileExists) {
      return next(new AppError("No business profile found with that ID", 404));
    }

    const reviewLinks = await ReviewLink.find({ businessProfileId }).sort({
      order: "asc",
    });

    res.status(200).json({
      status: "success",
      data: {
        reviewLinks,
      },
    });
  }
);
