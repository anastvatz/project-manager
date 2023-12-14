// @desc    Register a new user
// @route   POST /api/users
// @access  Public

import asyncHandler from 'express-async-handler';

import Project from "../models/projectsModel.js";

const createProjects = asyncHandler(async (req, res) => {
    const { name, description, date, time } = req.body;

    const project = await Project.create({
        name,
        description, date, time
    });

      if (user) {
    //     generateToken(res, user._id);

    res.status(201).json({
        name: project.name,
        description: project.description,
        date: project.date,
        time: project.time
    });}
    //   } else {
    //     res.status(400);
    //     throw new Error('Invalid user data');
    //   }
});


// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
const getUserProjects = asyncHandler(async (req, res) => {

    if (user) {
        const project = await Project.findById(req.user._id);
        if (project) {
            res.json({
                name: project.name,
                description: project.description,
                date: project.date,
                time: project.time
            });
        } else {
            res.status(404);
            throw new Error('User not found');
        }
    } 
    else {
        res.status(400);
        throw new Error('User not found');
    }


});

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
const updateUserProjects = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);

    if (user) {
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;

        if (req.body.password) {
            user.password = req.body.password;
        }

        const updatedUser = await user.save();

        res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
        });
    } else {
        res.status(404);
        throw new Error('User not found');
    }
});

const deleteProjects = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);

    if (user) {
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;

        if (req.body.password) {
            user.password = req.body.password;
        }

        const updatedUser = await user.save();

        res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
        });
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
