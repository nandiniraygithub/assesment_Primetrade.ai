import Note from "../model/note.js";
import catchAsyncError from "../middleware/catchmiddleware.js";
import ErrorHandler from "../middleware/errormiddleware.js";

// Create new note
export const createNote = catchAsyncError(async (req, res, next) => {
    req.body.user = req.user.id;

    const note = await Note.create(req.body);

    res.status(201).json({
        success: true,
        note,
    });
});

// Get all notes of logged in user
export const getMyNotes = catchAsyncError(async (req, res, next) => {
    const notes = await Note.find({ user: req.user.id });

    res.status(200).json({
        success: true,
        notes,
    });
});

// Admin: Get all notes from all users
export const getAllNotesAdmin = catchAsyncError(async (req, res, next) => {
    const notes = await Note.find().populate('user', 'name email');

    res.status(200).json({
        success: true,
        notes,
    });
});

// Get single note details
export const getNoteDetails = catchAsyncError(async (req, res, next) => {
    const note = await Note.findById(req.params.id);

    if (!note) {
        return next(new ErrorHandler("Note not found", 404));
    }

    // Check if owner or admin
    if (note.user.toString() !== req.user.id && req.user.role !== 'admin') {
        return next(new ErrorHandler("You are not authorized to view this note", 403));
    }

    res.status(200).json({
        success: true,
        note,
    });
});

// Update note
export const updateNote = catchAsyncError(async (req, res, next) => {
    let note = await Note.findById(req.params.id);

    if (!note) {
        return next(new ErrorHandler("Note not found", 404));
    }

    // Check if owner or admin
    if (note.user.toString() !== req.user.id && req.user.role !== 'admin') {
        return next(new ErrorHandler("You are not authorized to update this note", 403));
    }

    note = await Note.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
    });

    res.status(200).json({
        success: true,
        note,
    });
});

// Delete note
export const deleteNote = catchAsyncError(async (req, res, next) => {
    const note = await Note.findById(req.params.id);

    if (!note) {
        return next(new ErrorHandler("Note not found", 404));
    }

    // Check if owner or admin
    if (note.user.toString() !== req.user.id && req.user.role !== 'admin') {
        return next(new ErrorHandler("You are not authorized to delete this note", 403));
    }

    await note.deleteOne();

    res.status(200).json({
        success: true,
        message: "Note deleted successfully",
    });
});
