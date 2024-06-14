import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import documents from "./Routes/documents.js";
import authenticate from "./Routes/authenticate.js";
import listofwords from "./Routes/listofwords.js";
import wordsforuser from "./Routes/wordsforuser.js";
import reviews from "./Routes/reviews.js";

const app = express();
dotenv.config();
const PORT = 5000;

const connect = async () => {
    try {
      await mongoose.connect('mongodb://localhost:27017/languages', {
        useNewUrlParser: true,
        useUnifiedTopology: true
      });
      console.log("Connected to MongoDB on Docker");
    } catch (error) {
      console.error("Error connecting to MongoDB:", error.message);
      throw error;
    }
  };
  
  mongoose.connection.on("disconnected", () => {
    console.log("MongoDB disconnected");
  });


app.use(cors());

app.use("/listofwords",  listofwords);
app.use("/documents", authenticate, documents);
app.use("/userwords", authenticate, wordsforuser);
app.use("/reviews", reviews);
// app.use("/userwords", wordsforuser);



app.listen(PORT, () => {
  connect();
  console.log(`Backend started on port ${PORT}`);
});

