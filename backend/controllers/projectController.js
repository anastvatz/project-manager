// @desc    Register a new user
// @route   POST /api/users
// @access  Public

import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';

import Project from "../models/projectsModel.js";

const createProjects = asyncHandler(async (req, res) => {

    const user = await User.findById(req.user._id);

    const current = new Date();

    let day = current.getDate();
    let month = current.getMonth() + 1;
    let year = current.getFullYear();


    const { name, description, date, time } = req.body;

    if (date < `${year}-${month}-${day}` || (date == `${year}-${month}-${day}` && time < current.getHours() + ":" + current.getMinutes())) {
        res.status(400);
        throw new Error('Please enter valid date and time');
    }

    const project = await Project.create({
        name,
        description, date, time, owner: user._id
    });

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
    if (user) {
        const projects = await Project.find({ owner: req.user._id });

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
    try {
        const projectId = req.body._id;
        const project = await Project.findById(projectId);
        const current = new Date();

        let day = current.getDate();
        let month = current.getMonth() + 1;
        let year = current.getFullYear();

        if (project) {

            if (req.body.date < `${year}-${month}-${day}` || (req.body.date == `${year}-${month}-${day}` && req.body.time < current.getHours() + ":" + current.getMinutes())) {
                res.status(400);
                throw new Error('Please enter valid date and time');
            }
            
            project.name = req.body.name || project.name;
            project.description = req.body.description || project.description;
            project.date = req.body.date || project.date;
            project.time = req.body.time || project.time;

            const updatedProject = await project.save();

            res.json({
                _id: updatedProject._id,
                name: updatedProject.name,
                description: updatedProject.description,
                date: updatedProject.date,
                time: updatedProject.time,
            });
        } else {
            res.status(404);
            throw new Error('Project not found');
        }
    }
    catch (error) {
        //console.error(error);
        res.status(500).json({ error: error.message });
    }

});

const deleteProjects = asyncHandler(async (req, res) => {
    const projectId = req.body._id;
    //console.log(projectId);
    try {
        const project = await Project.findById(projectId);

        if (project) {
            await Project.deleteOne({ _id: projectId });
            res.json({ message: 'Project deleted successfully' });
        } else {
            res.status(404).json({ error: 'Project not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

export {
    getUserProjects,
    updateUserProjects,
    createProjects,
    deleteProjects
};
