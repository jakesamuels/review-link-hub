import { Schema, model } from "mongoose";
import validator from "validator";

const reviewLinkSchema = new Schema(
  {
    url: {
      type: String,
      required: true,
      validate: {
        validator: function (value) {
          return validator.isURL(value);
        },
        message: "Please provide a valid URL",
      },
      trim: true,
    },
    siteName: {
      type: String,
      required: true,
      trim: true,
    },
    siteLogo: {
      type: String,
      trim: true,
    },
    businessProfileId: {
      type: Schema.Types.ObjectId,
      ref: "BusinessProfile",
      required: true,
    },
    order: {
      type: Number,
    },
    clickCount: {
      type: Number,
      default: 0,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true, versionKey: false }
);

const ReviewLink = model("ReviewLink", reviewLinkSchema);

export default ReviewLink;
