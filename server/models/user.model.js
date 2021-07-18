import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "Le prénom est requis"],
      trim:true
    },
    lastName: {
      type: String,
      required: [true, "le nom est requis"],
      trim:true
    },
    email: {
      type: String,
      required: [true, "L'email est requis"],
      trim:true,
      unique: true,
    },
    password: {
      type: String,
      required: false,
      minLength: 6
    },
    avatar: {
      type: String,
      default: "https://ih0.redbubble.net/image.618427277.3222/flat,1000x1000,075,f.u2.jpg",
    },
    googleId: {
      type: String,
    },
    likes: {
      type: [String],
    },
    unlikes : {
      type: [String]
    },
    watchList: {
      type: [String],
    },
    resetPasswordToken: {
      type: String,
    },
    resetPasswordExpire: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("user", userSchema);
