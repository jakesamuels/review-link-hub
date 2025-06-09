import express from "express";
import {
  createBusinessProfile,
  getLoggedInUserBusinessProfile,
  getBusinessProfileById,
  updateBusinessProfile,
} from "./../controllers/businessProfileController.js";
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

export default router;
