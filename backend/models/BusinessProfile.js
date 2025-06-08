import { Schema, model } from "mongoose";

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
    ownerId: {
      type: Schema.Types.ObjectId,
      ref: "User",
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
