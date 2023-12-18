import { Container, Card, Button } from 'react-bootstrap';
import { useSelector } from 'react-redux';

import { FiEdit } from "react-icons/fi";
import { FiDelete } from "react-icons/fi";
import { FiFilePlus } from "react-icons/fi";

import { useGetpMutation } from '../slices/projectsApiSlice';
import "../index.css";
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';



const Project = () => {
    const { userInfo } = useSelector((state) => state.auth);
    const [projects, setProjects] = useState([]);

    const navigate = useNavigate();

    const [getProjects, { isLoading }] = useGetpMutation();
    const current = new Date();

    let day = current.getDate();
    let month = current.getMonth() + 1;
    let year = current.getFullYear();

    const isDueVSoon = (date) => {
        if (date.slice(0, 4) - year == 0 && date.slice(5, 7) - month == 0 && date.slice(8, 10) - day < 3) {
            return true;
        }
        else {
            return false;
        }
    }

    const isDueSoon = (date) => {
        if (date.slice(0, 4) - year == 0 && date.slice(5, 7) - month == 0 && date.slice(8, 10) - day < 7) {
            return true;
        }
        else {
            return false;
        }
    }

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

    const sortedProjects = projects.slice().sort((a, b) => {
        const aDateTime = new Date(a.date + ' ' + a.time);
        const bDateTime = new Date(b.date + ' ' + b.time);

        return aDateTime - bDateTime;
    });

    const submitHandlerU = async (e, projectId) => {
        e.preventDefault();
        const updatedProject = projects.find((project) => project._id === projectId);
        localStorage.setItem('updatedProject', JSON.stringify(updatedProject));

        navigate('/update');
        console.log('Updating project:', updatedProject);
    };

    const submitHandlerD = async (e, projectId) => {
        e.preventDefault();
        const deleteProject = projects.find((project) => project._id === projectId);
        localStorage.setItem('deleteProject', JSON.stringify(deleteProject));

        navigate('/delete');
        console.log('Delete project:', deleteProject);
    };

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
                            Create New Project <FiFilePlus />
                        </Button>
                    </div>
                </Card>
            </Container>
            <p></p>

            <Container className='d-flex justify-content-center'>
                <Card className='p-4 align-items-center project-card bg-light w-75 projects'>

                    {sortedProjects.length === 0 ? (<h3>No Projects Yet</h3>)
                        : (
                            <>
                                <h3>Projects</h3>
                                <div className='inside-project'>
                                    {sortedProjects.map((project) => (
                                        <Card className='p-4 d-flex flex-column project-card bg-light project'>
                                            <div key={project._id} className="project-item">
                                                <p className='name'>Name: {project.name}</p>
                                                <p className='description'>Description: {project.description}</p>
                                                <p className={isDueVSoon(project.date) ? 'text-danger' : isDueSoon(project.date) ? 'danger' : ''}>Due Date: {project.date}</p>
                                                <p>Due Time: {project.time}</p>
                                                <div className='buttons align-items-center justify-content-center' >
                                                    <Button variant='secondary' key={project._id} className="me-3" onClick={(e) => submitHandlerU(e, project._id)}>
                                                        Edit<FiEdit />
                                                    </Button>
                                                    <p></p>
                                                    <Button key={project._id} onClick={(e) => submitHandlerD(e, project._id)} className='me-3 red-button'>
                                                        Delete<FiDelete />
                                                    </Button>
                                                </div>
                                            </div>
                                        </Card>

                                    ))}</div>
                            </>
                        )}

                </Card>
            </Container>
        </div>
    );
};

export default Project;
