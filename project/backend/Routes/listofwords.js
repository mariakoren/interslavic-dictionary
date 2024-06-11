import express from "express";
import Words from "../models/words.js";

const router = express.Router();


const createWord = async (req, res) => {
    // console.log(req.body);
    // console.log(req.query);
    // res.status(200).json("ok");
    const newWord = new Words(req.query);
    try {
        const savedWord = await newWord.save();
        res.status(200).json(savedWord)
    } catch(err){
        res.status(500).json(err);
    }
}

const getListOfWords = async (req, res) => {
    try {
        const words = await Words.find(req.query).limit(req.query.limit)
        res.status(200).json(words)
    } catch(err){
        res.status(500).json(err);
    }
}

const deleteWorld = async (req, res) => {

    try {
       await Words.findByIdAndDelete(
            req.query.id
            )

        res.status(200).json("Word has been deleted")
    } catch(err){
        res.status(500).json(err);
    }
}


router.post("/", createWord);
router.get("/", getListOfWords)
router.delete("/", deleteWorld);
export default router;