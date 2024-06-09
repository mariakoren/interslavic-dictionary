import mongoose from 'mongoose';

const WordsSchema= new mongoose.Schema({
    polish:{
        type: String,
        required: true,
    },
    interslavic: {
        type: String,
        required: true
    }
},{timestamps: true})

export default mongoose.model("Words", WordsSchema);