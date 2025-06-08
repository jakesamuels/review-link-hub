// import { mongoose, Schema } from "mongoose";
// import validator from "validator";

// const userSchema = new Schema(
//   {
//     email: {
//       type: String,
//       required: [true, "Email must be provided."],
//       unique: true,
//       trim: true,
//       lowercase: true,
//       validate: [validator.isEmail, "Please provide a valid email"],
//     },
//     businessProfileId: {
//        type: Schema.Types.ObjectId,
//        ref: "BusinessProfile",
//     },
//     password: {
//       type: String,
//       required: [true, "Password must be provided"],
//     },
//     passwordConfirm: {
//       type: String,
//       required: [true, "Please confirm your password"],
//       validate: {
//         // This only works on CREATE and SAVE!
//         validator: function (el) {
//           return el === this.password;
//         },
//         message: "Passwords do not match",
//       },
//     },
//     passwordChangedAt: { type: Date },
//     createdAt: {
//       type: Date,
//       default: Date.now,
//     },
//     updatedAt: {
//       type: Date,
//       default: Date.now,
//     },
//   },
//   { timestamps: true, versionKey: false }
// );

// const User = new mongoose.model("User", userSchema);

// export default User;
