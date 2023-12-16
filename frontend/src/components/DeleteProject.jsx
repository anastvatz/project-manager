import { Container, Card, Button } from 'react-bootstrap';
import { useDeleteMutation } from '../slices/projectsApiSlice';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const DeleteProject = () => {
    const [del, { isLoading }] = useDeleteMutation();
    const storedProject = JSON.parse(localStorage.getItem('deleteProject'));
    const navigate = useNavigate();


    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            console.log(storedProject);
            const res = await del({ _id: storedProject._id }).unwrap();
            toast.success('Project deleted successfully');
            navigate('/project');
          } catch (err) {
            toast.error(err?.data?.message || err.error);
          }
    };

    return (
        <div className=' py-5'>
            <Container className='d-flex justify-content-center'>
                <Card className='p-5 d-flex flex-column align-items-center DeleteProject-card bg-light w-75'>
                    <h3 className='text-center mb-4'>Are you sure you want to delete this project?</h3>
                    <div className='d-flex'>
                        <Button variant='primary' className='me-3 red-button' onClick={(e) => submitHandler(e)}>
                            Delete
                        </Button>
                        <Button variant='secondary' href='/project'>
                            Cancel
                        </Button>
                    </div>
                </Card>
            </Container>
        </div>
    );
};

export default DeleteProject;
