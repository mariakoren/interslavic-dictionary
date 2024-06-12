import mongoose from 'mongoose';

const WordsforuserSchema= new mongoose.Schema({
    user:{
        type: String,
        required: true,
    },
    idWord: {
        type: String,
        required: true
    }
},{timestamps: true})

export default mongoose.model("Wordsforuser", WordsforuserSchema);