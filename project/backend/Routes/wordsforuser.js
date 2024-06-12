import express from "express";
import Wordsforuser from "../models/wordsforuser.js";
import Words from "../models/words.js";
const router = express.Router();


const createWordforuser = async (req, res) => {
    // console.log(req.body);
    // console.log(req.query);
    // res.status(200).json("ok");
    const newWord = new Wordsforuser(req.query);
    try {
        const savedWord = await newWord.save();
        res.status(200).json(savedWord)
    } catch(err){
        res.status(500).json(err);
    }
}

const getListOfWordsforusers = async (req, res) => {
    try {
        const words = await Wordsforuser.find(req.query)
        res.status(200).json(words)
    } catch(err){
        res.status(500).json(err);
    }
}

const getListOfWordsforuser = async (req, res) => {
    try {
        const user = req.user;
        const wordsForUser = await Wordsforuser.find({ user: user }, 'idWord');
        const wordIds = wordsForUser.map(word => word.idWord);
        const words = await Words.find({ _id: { $in: wordIds } });
        res.status(200).json(words);
    } catch(err) {
        res.status(500).json(err);
    }
}



const deleteWorldforuser = async (req, res) => {

    try {
       await Wordsforuser.findByIdAndDelete(
            req.query.id
            )

        res.status(200).json("Word has been deleted")
    } catch(err){
        res.status(500).json(err);
    }
}


router.post("/", createWordforuser);
router.get("/all", getListOfWordsforusers);
router.get("/", getListOfWordsforuser)
router.delete("/", deleteWorldforuser);
export default router;