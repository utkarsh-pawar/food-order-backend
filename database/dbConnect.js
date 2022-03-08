import mongoose from "mongoose";
import config from '../config/index.js'

const dbConnect = () => {
  mongoose
    .connect(config.MONGO_URI)
    .then(() => {
      console.log("server is connected to database");
    })
    .catch(() => {
      console.log("error in connection");
      process.exit();
    });
};

export default dbConnect;
