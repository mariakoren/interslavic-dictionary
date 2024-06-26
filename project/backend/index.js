import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import authenticate from "./Routes/authenticate.js";
import listofwords from "./Routes/listofwords.js";
import wordsforuser from "./Routes/wordsforuser.js";
import reviews from "./Routes/reviews.js";

const app = express();
dotenv.config();
const PORT = 5000;

const connect = async () => {
  const mongoURI = process.env.MONGO_URI || 'mongodb://mongo:27017/languages';

  try {
    // await mongoose.connect(mongoURI, {
    //   useNewUrlParser: true,
    //   useUnifiedTopology: true
    // });
    await mongoose.connect(mongoURI);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error.message);
    console.error("Stack Trace:", error.stack);
    process.exit(1);
  }
};
  
  mongoose.connection.on("disconnected", () => {
    console.log("MongoDB disconnected");
  });


app.use(cors());

app.use("/listofwords",  listofwords);
app.use("/userwords", wordsforuser);
app.use("/reviews", reviews);





app.listen(PORT, () => {
  connect();
  console.log(`Backend started on port ${PORT}`);
});

