import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import documents from "./Routes/documents.js";
import authenticate from "./Routes/authenticate.js";

(async function () {
  dotenv.config();


  const PORT = 5000;
  const app = express();
  app.use(cors());
  const server = app.listen(PORT, () =>
    console.log(`Backend started on port ${PORT}`)
  );

  app.use("/documents", authenticate, documents);
})();