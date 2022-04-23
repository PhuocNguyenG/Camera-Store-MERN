import mongoose from "mongoose";
import * as dotenv from "dotenv";
import { appendFile } from "fs";

dotenv.config();

export async function dbConnect() {
  await mongoose
    .connect(
      // process.env.DB_URI ||
      "mongodb+srv://camerasale:camerasale2022@cluster0.cp0hp.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
    )
    .then(() => {
      console.log(`Mongo has connected on ${mongoose.connection.port}`);
    })
    .catch((err) => {
      console.error(err);
    });
}
