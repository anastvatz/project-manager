import { Container, Card, Button } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';


const Project = () => {
    const { userInfo } = useSelector((state) => state.auth);

    return (
        <div className=' py-5'>
            <Container className='d-flex justify-content-center'>
                <Card className='p-5 d-flex flex-column align-items-center project-card bg-light w-75'>
                    <h1 className='text-center mb-4'> {userInfo.name}, welcome to your project manager</h1>
                    <p className='text-center mb-4'>
                        Now can easily see, create, edit and delete your tasks.
                    </p>
                    <div className='d-flex'>
                        <Button variant='primary' href='/new' className='me-3'>
                            New Project
                        </Button>
                        <Button variant='secondary' href='/edit'>
                            Edit Projects
                        </Button>
                    </div>
                </Card>
            </Container>
        </div>
    );
};

export default Project;
