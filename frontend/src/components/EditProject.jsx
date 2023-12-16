import { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import FormContainer from '../components/FormContainer';
import { toast } from 'react-toastify';
import Loader from '../components/Loader';
import { useUpdateMutation } from '../slices/projectsApiSlice';
import { useNavigate } from 'react-router-dom';


const EditProject = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');

    const navigate = useNavigate();

    const storedProject = JSON.parse(localStorage.getItem('updatedProject'));
    const [updateProject, { isLoading }] = useUpdateMutation();
    console.log(storedProject);


    useEffect(() => {
        setName(storedProject.name);
        setDescription(storedProject.description);
        if (storedProject.date !== null) {
            setDate(storedProject.date);
        }

        if (storedProject.time !== null) {
            setTime(storedProject.time);
        }
        console.log('Retrieved project for update:', storedProject);

        //localStorage.removeItem('updatedProject');
    }, [storedProject.date, storedProject.time]);


    const submitHandler = async (e) => {
        e.preventDefault();
        
        try {
            const res = await updateProject({
                _id: storedProject._id,
                name,
                description,
                date,
                time
            }).unwrap();
            console.log(res);
            toast.success('Project updated successfully');
            localStorage.removeItem('updatedProject');
            navigate("/project");
        } catch (err) {
            toast.error(err?.data?.message || err.error);
        }

    };
    return (
        <FormContainer>
            <h1>Update Project</h1>

            <Form onSubmit={submitHandler}>
                <Form.Group className='my-2' controlId='name'>
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        type='name'
                        placeholder='Enter name'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    ></Form.Control>
                </Form.Group>
                <Form.Group className='my-2' controlId='description'>
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                        type='description'
                        placeholder='Enter description'
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    ></Form.Control>
                </Form.Group>
                <Form.Group className='my-2' controlId='date'>
                    <Form.Label>Date</Form.Label>
                    <Form.Control
                        type='date'
                        placeholder='Enter date'
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                    ></Form.Control>
                </Form.Group>

                <Form.Group className='my-2' controlId='time'>
                    <Form.Label>Time</Form.Label>
                    <Form.Control
                        type='time'
                        placeholder='Enter time'
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                    ></Form.Control>
                </Form.Group>

                <Button type='submit' variant='primary' className='mt-3'>
                    Update Project
                </Button>

                {isLoading && <Loader />}
            </Form>
        </FormContainer>
    );
};

export default EditProject;
