import { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import FormContainer from '../components/FormContainer';
import Loader from '../components/Loader';
import { useNavigate } from 'react-router-dom';
import { useNewpMutation } from '../slices/projectsApiSlice';
import { toast } from 'react-toastify';


const NewProject = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');

    const navigate = useNavigate();
    const [newP, { isLoading }] = useNewpMutation();

    const submitHandler = async (e) => {
        e.preventDefault();

            try {
                const res = await newP({ name, description, date, time }).unwrap();
                toast.success('Project saved');
                navigate('/project');
            } catch (err) {
                toast.error(err?.data?.message || err.error);
            }
    };
    return (
        <FormContainer>
            <h1>New Task</h1>
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
                        type='text'
                        placeholder='Enter description'
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    ></Form.Control>
                </Form.Group>

                <Form.Group className='my-2' controlId='date'>
                    <Form.Label>Date</Form.Label>
                    <Form.Control
                        type='date'
                        placeholder='Enter due date'
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                    ></Form.Control>
                </Form.Group>

                <Form.Group className='my-2' controlId='time'>
                    <Form.Label>Time</Form.Label>
                    <Form.Control
                        type='time'
                        placeholder='Enter due time'
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                    ></Form.Control>
                </Form.Group>


                <Button type='submit' variant='primary' className='mt-3'>
                    Save
                </Button>

                {isLoading && <Loader />}
            </Form>

        </FormContainer>
    );
};

export default NewProject;
