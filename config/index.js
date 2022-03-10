import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT || 4000;

const config = {
  PORT: PORT,
  MONGO_URI:process.env.MONGO_URI,
  TOKEN_KEY:process.env.TOKEN_KEY
};

export default config;
