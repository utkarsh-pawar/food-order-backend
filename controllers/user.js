import { defaultResponseObject } from "../constants/response.js";
import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import Validator from "validator";

//USER SIGNUP
export const signUp = async (req, res) => {
  try {
    const { first_name, last_name, contact_no, email, password } = req.body;
    if (!first_name || !last_name || !contact_no || !email || !password) {
      return res.status(400).json("enter all required fields!!");
    }

    if (!Validator.isEmail(email)) {
      return res.status(400).json("enter valid email address");
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const isUser =
      (await User.findOne({ email })) || (await User.findOne({ contact_no }));
    if (isUser) {
      return res.status(400).json("Account already exists.");
    }

    const user = await User({
      first_name,
      last_name,
      contact_no,
      email,
      hashedPassword,
    });

    const response = { ...defaultResponseObject };
    user.save();
    response.data = user;
    res.json(response);
  } catch (err) {
    res.status(400).json(err.message);
  }
};

//USER-LOGIN
export const login = async (req, res) => {
  const { inputId, password } = req.body;

  if (!password) {
    return res.status(400).json("enter password");
  } else if (!InputId) {
    return res.status(400).json("enter email id or phone number");
  }




};
