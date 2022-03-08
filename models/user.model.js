import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  first_name: {
    type: String,
    trim: true,
  },
  last_name: {
    type: String,
    trim: true,
  },
  contact_no: {
    type: Number,
    trim: true,
  },
  email: {
    type: String,
    trim: true,
  },
  password: {
    type: String,
  },
  gender: {
    type: String,
    enum: ["M", "F", "O"],
  },
  token: [
    {
      token: {
        type: String,
      },
      device_token: {
        type: String,
      },
    },
  ],
});

const User = mongoose.model("User", userSchema);

export default User;
