import express from "express";
import {
  createBusinessProfile,
  getLoggedInUserBusinessProfile,
  getBusinessProfileById,
  updateBusinessProfile,
} from "./../controllers/businessProfileController.js";
import {
  addReviewLink,
  getReviewLinksByBusinessProfile,
} from "./../controllers/reviewLinkController.js";
import { protect } from "./../controllers/authController.js";

const router = express.Router();

router
  .route("/")
  .post(protect, createBusinessProfile)
  .get(protect, getLoggedInUserBusinessProfile);

router
  .route("/:id")
  .get(getBusinessProfileById)
  .put(protect, updateBusinessProfile);

router
  .route("/:businessProfileId/review-links")
  .post(protect, addReviewLink)
  .get(getReviewLinksByBusinessProfile);

export default router;
