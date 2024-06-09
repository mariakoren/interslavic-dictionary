import express from "express";
const router = express.Router();

let data = {
  "maria.korenn@gmail.com": [
    "data1",
    "data2",
    "data3"
  ],
  "k@gmail.com": [
    "dane1",
    "dane2",
    "dane3"
  ],
};

const getDocuments = async (req, res) => {
  try {
    const email = req.user;

    res.status(200).send(data[email]);
  } catch (err) {
    res.status(500).send(err);
  }
};

router.get("/", getDocuments);
export default router;