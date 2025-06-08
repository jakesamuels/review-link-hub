import { Schema, model } from "mongoose";

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
    },
    siteName: {
      type: String,
      required: true,
    },
    siteLogo: {
      type: String,
    },
    businessProfileId: {
      type: Schema.Types.ObjectId,
      ref: "BusinessProfile",
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
