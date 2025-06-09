import express from "express";
import {
  updateReviewLink,
  deleteReviewLink,
} from "./../controllers/reviewLinkController.js";
import { protect } from "./../controllers/authController.js";

const router = express.Router();

/* 
 - addReviewLink  
 - getReviewLinksByBusinessProfile 
 
 Used in businessProfileRoutes.js
 on route("business-profile/:businessProfileId/review-links")
*/

router
  .route("/:id")
  .put(protect, updateReviewLink)
  .delete(protect, deleteReviewLink);

export default router;
