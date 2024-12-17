import mongoose, {Schema, models} from "mongoose";
//TODO: INSTEAD OF AVERAGE, HAVE A TOTAL FIELD THAT IS UPDATED EVERY TIME A REVIEW IS WRITTEN/DELETED
const teacherSchema = new Schema(
    {
        name: {
            type: String,
            required: true
        },
        total: {
            type: Number,
            default: 0
        },
        reviews: [{
            type: Schema.Types.ObjectId,
            ref: "Review"
        }
        ]
    }, {timestamps: true}
);

const Teacher = models.Teacher || mongoose.model("Teacher", teacherSchema);
export default Teacher;

