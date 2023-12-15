import { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import FormContainer from '../components/FormContainer';
import { toast } from 'react-toastify';
import Loader from '../components/Loader';
import { useUpdateUserMutation } from '../slices/usersApiSlice';
import { setCredentials } from '../slices/authSlice';

const EditProject = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');

    //const dispatch = useDispatch();

    const { userInfo } = useSelector((state) => state.auth);

    const [updateProject, { isLoading }] = useUpdateUserMutation();

    useEffect(() => {
        setDate(userInfo.date);
        setTime(userInfo.time);
    }, [userInfo.date, userInfo.time]);

    const submitHandler = async (e) => {
        e.preventDefault();

        try {
            const res = await updateProject({
                _id: userInfo._id,
                name,
                description,
                date,
                time
            }).unwrap();
            console.log(res);
            //dispatch(setCredentials(res));
            toast.success('Project updated successfully');
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
                    <Form.Label>Confirm time</Form.Label>
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
