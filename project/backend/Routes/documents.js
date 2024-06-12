import express from "express";
const router = express.Router();

let data = {
  "maria": [
    "data1",
    "data2",
    "data3"
  ],
  "kate": [
    "dane1",
    "dane2",
    "dane3"
  ],
};

const getDocuments = async (req, res) => {
  try {
    const username = req.user;

    res.status(200).send(data[username]);
  } catch (err) {
    res.status(500).send(err);
  }
};

router.get("/", getDocuments);
export default router;