import mongoose, {Schema, models} from "mongoose";

const userSchema = new Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true
        },
        token: {
            type: String,
        },
        isVerified: {
            type: Boolean,
            default: false,
        },
        reviews: [{
            type: Schema.Types.ObjectId,
            ref: "Review"
        }
        ]
,    }, {timestamps: true}
);

const User = models.User || mongoose.model("User", userSchema);
export default User;
