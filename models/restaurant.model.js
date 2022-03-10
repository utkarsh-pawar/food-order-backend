import mongoose from "mongoose";

var manager_details = new mongoose.Schema({
    name: {
      type: String,
    },
    contact_no: {
      type: Number,
    },
    alternate_no: {
      type: Number,
    },
  }, {timestamps: true} 
)

var menuData = new mongoose.Schema({
  category_name:{
    type:String
  },
  item_name:{
    type:String
  },
  item_picture:{
    type:String
  },
  price:{
    type:Number
  }
})

const restaurantSchema = new mongoose.Schema({
  email: {
    type: String,
  },
  owner_name: {
    type: String,
  },
  password: {
    type: String,
  },
  contact_no: {
    type: Number,
  },
  token:{
    type: String,
  },
  device_token: [{
      type: String,
  }],  
  manager_details :[manager_details],
  menu :[menuData],
}, {timestamps: true});

const Restaurant = mongoose.model("Restaurant", restaurantSchema);

export default Restaurant;
