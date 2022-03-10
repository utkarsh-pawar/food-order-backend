import { defaultResponseObject } from "../constants/response.js";
import Restaurant from "../models/restaurant.model.js";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import config from "../config/index.js";

dotenv.config()

export const addRestaurant = async (req, res) => {
    //return console.log(req.body.manager_details.name);
    try {
      const { email, owner_name, password, contact_no } = req.body;
      if (!email || !owner_name || !contact_no || !password) {
        return res.status(400).json("enter all required fields!!");
      }
  
      const hashedPassword = await bcrypt.hash(password, 10);
      const isRestaurant = (await Restaurant.findOne({ email })) || (await Restaurant.findOne({ contact_no }));
      if (isRestaurant) {
        return res.status(400).json("Account already exists.");
      }

    const restaurant = await Restaurant({
        email : req.body.email,
        owner_name : req.body.owner_name,
        contact_no : req.body.contact_no,
        password : hashedPassword,
        manager_details : req.body.manager_details
      });
  
      const response = { ...defaultResponseObject };
      restaurant.save();
      response.data = restaurant;
      res.json(response);
    } catch (err) {
      res.status(400).json(err.message);
    }
  };


  

  export const loginRestaurant = async (req, res) => {
    try {
      const { email, password } = req.body;

      if (!(email && password)) {
        res.status(400).send("All input is required");
      }

      const restaurant = await Restaurant.findOne({ email });

      if(!restaurant){
        return res.status(404).json("No account exist with this email address or phone number")
      }

      const passwordCheck = await bcrypt.compare(password, restaurant.password)

      if(!passwordCheck){
        res.status(400).json("enter valid password")
      }

      const token = jwt.sign(
        { restaurant_id: restaurant._id, email },
        config.TOKEN_KEY,
        {
          expiresIn: "2h",
        }
      );

      const updated = await Restaurant.findOneAndUpdate({_id:restaurant._id},{token:token},{new:true})
      res.status(200).json(updated)
    } catch (err) {
      res.status(400).json(err.message)
    }
 };

  export const addMenu = async (req, res) => {
    try {
      //console.log(req);
      const { category_name,item_picture, item_name, price } = req.body;
      if (!category_name || !item_name || !item_picture || !price) {
        return res.status(400).json("enter all required fields!!");
      }

    const allReadyRegister = await Restaurant.findOne({$and:[ {'menu.item_name':req.body.item_name},{'menu.category_name':req.body.category_name} ]});
    if(allReadyRegister){
        return res.status(400)
      .json({
            status: "failed",
            message: "All Ready Exist!",
            data: ''
        });
    }

    const menudata = {
      category_name: req.body.category_name,
      item_name: req.body.item_name,
      item_picture: req.body.item_picture,
      price: req.body.price
    };
    const result = await Restaurant.findOneAndUpdate({ _id: req.restaurant.restaurant_id },{ $push: { menu: menudata  }},{new:true});    
    res.status(200).json(result)
    } catch (err) {
      res.status(400).json(err);
    }
  };
