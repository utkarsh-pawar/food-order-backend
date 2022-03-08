import mongoose from "mongoose";

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

  manager_details: {
    name: {
      type: String,
    },
    contact_no: {
      type: Number,
    },
    alternate_no: {
      type: Number,
    },
  },
});

const Restaurant = mongoose.model("Restaurant", restaurantSchema);

export default Restaurant;
