import express from "express";
import {
  createNote,
  getMyNotes,
  getNoteDetails,
  updateNote,
  deleteNote,
  getAllNotesAdmin,
} from "../controllers/noteController.js";
import { isAuthenticated, authorizedRoles } from "../middleware/authmiddlware.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Notes
 *   description: Notes Management APIs
 */

router.use(isAuthenticated);

/**
 * @swagger
 * /notes:
 *   post:
 *     summary: Create a new note
 *     tags: [Notes]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [title, content]
 *             properties:
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *     responses:
 *       201:
 *         description: Note created successfully
 */
router.route("/").post(createNote);

/**
 * @swagger
 * /notes:
 *   get:
 *     summary: Get logged-in user's notes
 *     tags: [Notes]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of user notes
 */
router.route("/").get(getMyNotes);

/**
 * @swagger
 * /notes/admin/all:
 *   get:
 *     summary: Get all notes (Admin only)
 *     tags: [Notes]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: All notes fetched successfully
 */
router.route("/admin/all").get(authorizedRoles("admin"), getAllNotesAdmin);

/**
 * @swagger
 * /notes/{id}:
 *   get:
 *     summary: Get note details by ID
 *     tags: [Notes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Note details fetched successfully
 */
router.route("/:id").get(getNoteDetails);

/**
 * @swagger
 * /notes/{id}:
 *   put:
 *     summary: Update note by ID
 *     tags: [Notes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *     responses:
 *       200:
 *         description: Note updated successfully
 */
router.route("/:id").put(updateNote);

/**
 * @swagger
 * /notes/{id}:
 *   delete:
 *     summary: Delete note by ID
 *     tags: [Notes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Note deleted successfully
 */
router.route("/:id").delete(deleteNote);

export default router;
