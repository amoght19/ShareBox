import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
const userName = process.env.MONGODB_USERNAME;
const password = process.env.MONGODB_USER_PASSWORD;
const DB_URL =
  "mongodb+srv://" +
  userName +
  ":" +
  password +
  "@file-sharing.yurwhej.mongodb.net/?retryWrites=true&w=majority";

export const DBConnection = async () => {
  try {
    await mongoose.connect(DB_URL, { useNewUrlParser: true });
    console.log("Db connected");
  } catch (err) {
    console.log("could not connect to database ", err.message);
  }
};
