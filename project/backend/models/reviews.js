import mongoose from 'mongoose';

const ReviewsSchema = new mongoose.Schema({
    content:{
        type: String,
        required: true,
    }
},{timestamps: true})

export default mongoose.model("Reviews", ReviewsSchema );