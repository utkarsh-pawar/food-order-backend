import express from "express";
import jwt from "jsonwebtoken"
import config from '../config/index.js'
import Restaurant from "../models/restaurant.model.js";

export const verifyRestaurant =async(req,res,next) =>{
    try {
        const authHeader = await req.headers.auth;
        const token = await authHeader.split(" ")[1];
        const restaurant = jwt.verify(token,config.TOKEN_KEY)

        //console.log(restaurant.restaurant_id,restaurant.email);
        const isRestaurant = await Restaurant.findById(restaurant.restaurant_id)

        if(!isRestaurant){
            res.status(400).json("not valid token")
        }
        req.restaurant = restaurant;
        next();
    } catch (err) {
        res.status(400).json(err.message)
    }
}