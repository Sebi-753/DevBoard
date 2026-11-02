import mongoose from "mongoose";

enum UserRole {
  Freelancer = "freelancer",
  Client = "client",
  Admin = "admin",
}
enum Availability {
  FullTime = "full-time",
  PartTime = "part-time",
}

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "A user must have a name"],
      trim: true,
      unique: true,
    },

    email: {
      type: String,
      required: [true, "Email is required"],
      unique: [true, "There is an account with this email"],
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: [true, "The password is required"],
      minlength: [8, "Password must be at least 8 characters long"],
    },
    passwordChangedAt: Date,

    bio: String,
    phone: String,
    location: String,
    birthDate: Date,
    availability: {
      type: String,
      enum: Object.values(Availability),
      default: Availability.PartTime,
    },

    photo: {
      type: String,
      default: "",
    },

    role: {
      type: String,
      enum: Object.values(UserRole),
      default: UserRole.Client,
    },
    skills: {
      type: [String],
      default: [],
    },

    active: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  },
);

const User = mongoose.model("User", userSchema);

export default User;
