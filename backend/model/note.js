import mongoose from "mongoose";

const noteSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Please enter note title"],
        trim: true,
    },
    content: {
        type: String,
        required: [true, "Please enter note content"],
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true,
    },
}, { timestamps: true });

const Note = mongoose.model("Note", noteSchema);

export default Note;
