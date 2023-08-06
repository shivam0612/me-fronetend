import { useState, useEffect } from 'react';
import { Form, Button, Container, Card } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import FormContainer from '../components/FormContainer';
import { toast } from 'react-toastify';
import Loader from '../components/Loader';
import { useUpdateUserMutation } from '../slices/usersApiSlice';
import { setCredentials } from '../slices/authSlice';

const ProfileScreen = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [preference, setPreference] = useState('Other');

  const dispatch = useDispatch();

  const { userInfo } = useSelector((state) => state.auth);
  // console.log(userInfo)
  const [updateProfile, { isLoading }] = useUpdateUserMutation();

  useEffect(() => {
    setName(userInfo.name || ''); // Set the initial value to an empty string if userInfo.name is undefined
    setEmail(userInfo.email || ''); // Set the initial value to an empty string if userInfo.email is undefined
    setPhone(userInfo.phone || ''); // Set the initial value to an empty string if userInfo.phone is undefined
    setPreference(userInfo.preference || 'Other'); // Set the initial value to 'Other' if userInfo.preference is undefined
  }, [userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
    } else {
      try {
        const res = await updateProfile({
          _id: userInfo._id,
          name,
          email,
          password,
          phone,
          preference,
        }).unwrap();
        console.log(res);
        dispatch(setCredentials(res));
        toast.success('Profile updated successfully');
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  return (
    <FormContainer>
      <Container className='container-profile'>
        <h1 className='text-center pt-5 pb-3'>Update Profile</h1>
        <Card className="shadow p-4 mb-5">
          <Form className='profile-form pt-3 ' onSubmit={submitHandler}>
            <Form.Group className='pb-3 ' controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="name"
                placeholder="Enter name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>
            <Form.Group className='pb-3 ' controlId="email">
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>
            <Form.Group className='pb-3 ' controlId="phone">
              <Form.Label>Phone</Form.Label>
              <Form.Control
                type="tel"
                placeholder="Enter phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </Form.Group>
            <Form.Group className='pb-3 ' controlId="preference">
              <Form.Label>Preference</Form.Label>
              <Form.Control
                as="select"
                value={preference}
                onChange={(e) => setPreference(e.target.value)}
              >
                <option value="Other">Other</option>
                <option value="Music">Music</option>
                <option value="Movies">Movies</option>
                <option value="Games">Games</option>
                <option value="Singing">Singing</option>
              </Form.Control>
            </Form.Group>
            <Form.Group className='pb-3 ' controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="confirmPassword">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Confirm password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </Form.Group>

            <div className="d-flex justify-content-center ">
              <Button type="submit" variant="primary" className="mt-3 btn btn-primary btn-lg w-25">
                Update
              </Button>
            </div>

            {isLoading && <Loader />}
          </Form>
        </Card>
      </Container>
    </FormContainer>
  );
};

export default ProfileScreen;
