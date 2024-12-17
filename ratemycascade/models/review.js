import mongoose, { Schema, models } from 'mongoose';

const reviewSchema = new Schema({
    rating: { 
        type: Number, 
        required: true
    },
    comment: {
        type: String,
        required: true 
    },
    grade: { 
        type: String, 
        required: true 
    },
    course: { 
        type: String, 
        required: true 
    },
    user: { 
        type: Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    },
    teacher: { 
        type: Schema.Types.ObjectId, 
        ref: 'Teacher', 
        required: true 
    }
}, { timestamps: true });

const Review = models.Review || mongoose.model('Review', reviewSchema);
export default Review;

