import express from 'express';
import {
    getUserProjects,
    updateUserProjects,
    createProjects,
    deleteProjects  //
} from '../controllers/projectController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router
    .route('/')
    .get(protect, getUserProjects);

router
    .route('/update').put(protect, updateUserProjects);

router
    .route('/new').post(protect, createProjects);

router
    .route('/delete').put(protect, deleteProjects);



export default router;
