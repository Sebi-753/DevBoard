import mongoose from "mongoose";

enum UserRole {
  Freelancer = "freelancer",
  Client = "client",
  Admin = "admin",
}

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "A user must have a name"],
      trim: true,
    },

    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: [true, "The password is required"],
      minlength: [8, "Password must be at least 8 characters long"],
    },

    passwordConfirm: {
      type: String,
      required: [true, "Please confirm your password"],
      validate: {
        validator: function (value: string) {
          return value === this.password;
        },
        message: "Passwords do not match",
      },
    },

    photo: {
      type: String,
    },

    role: {
      type: String,
      enum: Object.values(UserRole),
      default: UserRole.Client,
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
