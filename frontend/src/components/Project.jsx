import { Container, Card, Button } from 'react-bootstrap';
import { useSelector } from 'react-redux';

import { FiEdit } from "react-icons/fi";
import { FiDelete } from "react-icons/fi";
import { FiFilePlus } from "react-icons/fi";

import { useGetpMutation } from '../slices/projectsApiSlice';
import "../index.css";
import { useEffect, useState } from 'react';


const Project = () => {
    const { userInfo } = useSelector((state) => state.auth);
    const [projects, setProjects] = useState([]);

    const [getProjects, { isLoading }] = useGetpMutation();
    console.log("O");

    useEffect(() => {
        fetchProjects();
    }, []);

    const fetchProjects = async () => {
        try {
            const res = await getProjects().unwrap();
            setProjects(res);
            console.log(res);
        }
        catch (err) {
            console.log(err);
        }
    }

    return (
        <div className=' py-5'>
            <Container className='d-flex justify-content-center'>
                <Card className='p-5 d-flex flex-column align-items-center project-card bg-light w-70'>
                    <h1 className='text-center mb-4'> {userInfo.name}, welcome to your project manager</h1>
                    <p className='text-center mb-4'>
                        Now can easily see, create, edit and delete your tasks.
                    </p>
                    <div className='d-flex'>
                        <Button variant='primary' href='/new' className='me-3'>
                            New Project <FiFilePlus />
                        </Button>
                        <Button variant='secondary' href='/edit' className='me-3'>
                            Edit Projects <FiEdit />

                        </Button>
                        <Button variant='secondary' href='/delete' className='me-3 red-button'>
                            Delete Project <FiDelete />



                        </Button>
                    </div>
                </Card>
            </Container>
            <p></p>
          
            <Container className='d-flex justify-content-center'>
                <Card className='p-4 d-flex flex-column align-items-center project-card bg-light w-75 projects'>
                    <h3>Projects</h3>
                    {projects.map((project) => (
                        <Card className='p-4 d-flex flex-column project-card bg-light w-50'>
                        <div key={project._id} className="project-item">
                            <p>Name: {project.name}</p>
                            <p>Description: {project.description}</p>
                            <p>Due Date: {project.date}</p>
                            <p>Due Time: {project.time}</p>
                        </div>
                        </Card>
                        
                    ))}
                </Card>
            </Container>
        </div>
    );
};

export default Project;
