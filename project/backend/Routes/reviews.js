import express from "express";
import Reviews from "../models/reviews.js";

const router = express.Router();

const createReview = async (req, res) => {
  const newReview = new Reviews(req.query);
  try {
    const savedReview = await newReview.save();
    res.status(200).json(savedReview);
  } catch (err) {
    res.status(500).json(err);
  }
};

const getReviews = async (req, res) => {
  try {
    const reviews = await Reviews.find(req.query);
    res.status(200).json(reviews);
  } catch (err) {
    res.status(500).json(err);
  }
};

const deleteReview = async (req, res) => {
    try {
      const deletedReview = await Reviews.findByIdAndDelete(req.query.id);
      if (deletedReview) {
        res.status(200).json({ message: "Review deleted successfully" });
      } else {
        res.status(404).json({ message: "Review not found" });
      }
    } catch (err) {
      res.status(500).json(err);
    }
  };

router.post("/", createReview);
router.get("/", getReviews);
router.delete("/", deleteReview);

export default router;
