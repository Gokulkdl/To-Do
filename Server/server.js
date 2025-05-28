import connectDB from "./config/db.js";
import express from 'express';
import dotenv from 'dotenv';

dotenv.config();


const app = express();

app.use("/uploads", express.static("uploads"));

connectDB();

app.listen(8000, () => {
    console.log("server started on port 8000");
});