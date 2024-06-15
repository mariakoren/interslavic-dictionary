import express from "express";
import Wordsforuser from "../models/wordsforuser.js";
import Words from "../models/words.js";

import authenticate from "./authenticate.js";
import isAdmin from "./isAdmin.js";
const router = express.Router();


const createWordforuser = async (req, res) => {
    const user = req.user;
    const idWord = req.query.idWord;
    const word = {
        user: user,
        idWord:idWord
    }
    const newWord = new Wordsforuser(word);
    try {
        const savedWord = await newWord.save();
        res.status(200).json(savedWord)
    } catch(err){
        res.status(500).json(err);
    }
}

const getListOfWordsforusers = async (req, res) => {
    try {

        const wordsForUsers = await Wordsforuser.find();
        const wordIds = wordsForUsers.map(wordForUser => wordForUser.idWord);
        const words = await Words.find({ _id: { $in: wordIds } });
        const combinedData = wordsForUsers.map(wordForUser => {
            const wordDetails = words.find(word => word._id.equals(wordForUser.idWord));
            return {
                _id: wordForUser._id,
                user: wordForUser.user,
                wordDetails: wordDetails ? wordDetails.toObject() : null
            };
        });

        res.status(200).json(combinedData);
    } catch (err) {
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



const deleteWordforuser = async (req, res) => {
    try {
       await Wordsforuser.findByIdAndDelete(req.query.id)
        res.status(200).json("Word has been deleted")
    } catch(err){
        res.status(500).json(err);
    }
}


router.post("/",  authenticate, createWordforuser);
router.get("/all", isAdmin, getListOfWordsforusers);
router.get("/",  authenticate, getListOfWordsforuser)
router.delete("/",  isAdmin, deleteWordforuser);
export default router;