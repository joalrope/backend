import { Schema, model } from "mongoose";

interface User {
  uid: Schema.Types.ObjectId;
  name: string;
  email: string;
  password: string;
  role: string;
  isActive: boolean;
  picture?: string;
  company?: string;
}

const UserSchema = new Schema<User>(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "The password is required"],
    },
    company: {
      type: String,
    },
    picture: {
      type: String,
    },
    role: {
      type: String,
      required: true,
      default: "customer",
      enum: ["superadmin", "admin", "customer", "provider"],
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

UserSchema.methods.toJSON = function () {
  const { __v, password, _id, ...user } = this.toObject();
  user.id = _id;
  return user;
};

export const User = model("User", UserSchema);
