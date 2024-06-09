import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import documents from "./Routes/documents.js";
import authenticate from "./Routes/authenticate.js";

function startServer() {
  dotenv.config();

  const PORT = 5000;
  const app = express();
  app.use(cors());
  
  app.use("/documents", authenticate, documents);
  
  const server = app.listen(PORT, () => {
    console.log(`Backend started on port ${PORT}`);
  });
}

startServer();
