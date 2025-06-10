import { Schema, model } from "mongoose";
import validator from "validator";

const businessProfileSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    logoUrl: {
      type: String,
    },
    description: {
      type: String,
      trim: true,
    },
    industry: {
      type: String,
    },
    website: {
      type: String,
      validate: {
        validator: function (value) {
          return validator.isURL(value);
        },
        message: "Please provide a valid URL",
      },
      trim: true,
    },
    ownerId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    isActive: {
      type: Boolean,
      default: true,
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

const BusinessProfile = model("BusinessProfile", businessProfileSchema);

export default BusinessProfile;
