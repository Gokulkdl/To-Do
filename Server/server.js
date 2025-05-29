import connectDB from "./config/db.js";
import express from 'express';
import dotenv from 'dotenv';
import cors from "cors";
import apiRoutes from "./routes/apiRoutes.js";



//environment variable loading...
dotenv.config();


const app = express();


// Middleware
app.use(cors());
app.use(express.json());


app.use("/uploads", express.static("uploads"));


// Routes
app.use("/api", apiRoutes);



connectDB();

app.listen(8000, () => {
    console.log("server is up on port 8000...");
});