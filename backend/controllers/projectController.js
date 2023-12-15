// @desc    Register a new user
// @route   POST /api/users
// @access  Public

import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';

import Project from "../models/projectsModel.js";

const createProjects = asyncHandler(async (req, res) => {

    const user = await User.findById(req.user._id);

    const { name, description, date, time } = req.body;

    const project = await Project.create({
        name,
        description, date, time, owner: user._id
    });

    //      if (user) {
    //     generateToken(res, user._id);

    res.status(201).json({
        name: project.name,
        description: project.description,
        date: project.date,
        time: project.time
    });//}
    //   } else {
    //     res.status(400);
    //     throw new Error('Invalid user data');
    //   }
});


// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
const getUserProjects = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);
    console.log("LALALALA");
    if (user) {
        const projects = await Project.find({ owner: req.user._id });

        // for (p in projects) {
        //     console.log(p.name, p.description);
        //     res.json({
        //         name: p.name,
        //         description: p.description,
        //         date: p.date,
        //         time: p.time
        //     });
        // }
        res.status(200).json(projects);

    } else {
        res.status(404);
        throw new Error('User not found');
    }

});

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
const updateUserProjects = asyncHandler(async (req, res) => {
    const proj = await Project.findById(req.project._id);

    if (proj) {
        proj.date = proj.body.date || proj.date;
        proj.time = proj.body.time || proj.time;

        const updatedProject = await proj.save();

        res.json({
            _id: updatedProject._id,
            date: updatedProject.date,
            time: updatedProject.time,
        });
    } else {
        res.status(404);
        throw new Error('Project not found');
    }
});

const deleteProjects = asyncHandler(async (req, res) => {
    const proj = await Project.findById(req.project._id);

    if (proj) {
        const res = await Project.findByIdAndDelete(req.project._id);
    } else {
        res.status(404);
        throw new Error('User not found');
    }
});

export {
    getUserProjects,
    updateUserProjects,
    createProjects,
    deleteProjects
};
