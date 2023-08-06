import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Modal, Button } from 'react-bootstrap';
import { useRegisterMutation } from '../../slices/usersApiSlice';
import { setCredentials } from '../../slices/authSlice';
import { useNavigate } from 'react-router-dom';

const UserRegistrationModal = ({ show, onClose, onRegister }) => {
  const [register, { isLoading }] = useRegisterMutation();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [cpassword, setCpassword] = useState('');
  const [preference, setPreference] = useState('Other')
  const [phone, setPhone] = useState('')
  const navigate = useNavigate()
  const [emailError, setEmailError] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [cpasswordError, setCPasswordError] = useState('');
  const [usernameError, setUsernameError] = useState('');

  const validateEmail = () => {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!emailPattern.test(email)) {
      setEmailError('Please enter a valid email address.');
    } else {
      setEmailError('');
    }
  };


  const validatePhone = () => {
    const phonePattern = /^[0-9]{10}$/;

    if (!phonePattern.test(phone)) {
      setPhoneError('Please enter a valid phone number.');
    } else {
      setPhoneError('');
    }
  };

  const validatePassword = () => {
    const passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;

    if (!passwordPattern.test(password)) {
      setPasswordError(
        'Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one number.'
      );
    } else {
      setPasswordError('');
    }
  };

  const validateConfirmPassword = () => {
    if (password !== cpassword) {
      setCPasswordError("Passwords don't match.");
    } else {
      setCPasswordError('');
    }
  };

  const validateUsername = () => {
    const usernamePattern = /^[A-Za-z]{3,}$/;

    if (!usernamePattern.test(name)) {
      setUsernameError('Please enter a valid username (minimum 3 characters, alphabets only).');
    } else {
      setUsernameError('');
    }
  };


  const submitHandler = async (e) => {
    e.preventDefault();
    const payload = {
      name,
      email,
      phone,
      preference, // Include the preference value in the payload
      password,
      cpassword
    };

    if (password !== cpassword) {
      toast.error('Passwords do not match');
    } else {
      try {
        const res = await register(payload).unwrap();
        onRegister(res.data); // Pass the new user data to the parent component

        navigate('/meusers')
        onClose(); // Close the modal
        toast.success("New User Registered Successfully")
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }

    useEffect(() => {

    }, [submitHandler])
  

  };

 
  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Register New User</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', width:"80%", margin:"auto" }}>
          <div>
            <label>Name:</label>
          </div>
          <div>
            <input
              type="text"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onBlur={validateUsername}
              required
            />
            {/* Add an error message for invalid username */}
            {usernameError && <span style={{ color: 'red' }}>{usernameError}</span>}
          </div>
          <div>
            <label>Email:</label>
          </div>
          <div>
            <input
              type="email"
              name="email"
              value={email}
              onBlur={validateEmail}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            {/* Add an error message for invalid email */}
            {emailError && <span style={{ color: 'red' }}>{emailError}</span>}
          </div>
          <div>
            <label>Phone:</label>
          </div>
          <div>
            <input
              type="text"
              name="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              onBlur={validatePhone}
              required
            />
            {/* Add an error message for invalid phone number */}
            {phoneError && <span style={{ color: 'red' }}>{phoneError}</span>}
          </div>
          <div>
            <label>Preference:</label>
          </div>
          <div>
            <select name="preference" value={preference} onChange={(e) => setPreference(e.target.value)}>
              <option value="Music">Music</option>
              <option value="Movies">Movies</option>
              <option value="Games">Games</option>
              <option value="Singing">Singing</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div>
            <label>Password:</label>
          </div>
          <div>
            <input
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onBlur={validatePassword}
              required
            />
            {/* Add an error message for invalid password */}
            {passwordError && <span style={{ color: 'red' }}>{passwordError}</span>}
          </div>
          <div>
            <label>Confirm Password:</label>
          </div>
          <div>
            <input
              type="password"
              name="cpassword"
              value={cpassword}
              onChange={(e) => setCpassword(e.target.value)}
              onBlur={validateConfirmPassword}
              required
            />
            {/* Add an error message for password mismatch */}
            {cpasswordError && <span style={{ color: 'red' }}>{cpasswordError}</span>}
          </div>
        </form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={submitHandler}>
          Register
        </Button>
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>);
};

const MEUsers = () => {
  const navigate = useNavigate()
  const [users, setUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);

  // Fetch all users from the database


  const handleRegisterComplete = (newUser) => {
    setUsers((prevUsers) => [...prevUsers, newUser]); // Add the new user to the current user list
  };

  const fetchUsers = async () => {
    try {
      const response = await fetch('/api/users/getusers'); // Replace this with your actual API endpoint to fetch users
      //   console.log(response);
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      toast.error('Error fetching users:', error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  
  const handleDelete = async (userId) => {
    try {
      // Replace the endpoint with your actual API endpoint to delete the user
      await fetch(`/api/users/deleteuser/${userId}`, {
        method: 'DELETE',
      });
      // Update the list of users after deletion
      toast.success("User Deleted Successfully")
      fetchUsers();
    } catch (error) {
      toast.error('Error deleting user:', error);
    }
  };

  const handleRegister = async () => {
    setShowModal(true);
  }

  return (
    <div className='body-tag1 vh-100' style={{ display: 'flex', justifyContent: 'center' }}>
      <div className='MEUsers'>
        <h1 className='MEUsers-title'>Users List</h1>

        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  <button className='btn btn-danger' onClick={() => handleDelete(user._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className='mt-4' style={{ display: 'flex', justifyContent: 'center' }}>
          <button className="btn btn-primary" onClick={handleRegister}>
            Register User
          </button>
        </div>

        {showModal && (
          <UserRegistrationModal
            show={showModal}
            onClose={() => setShowModal(false)}
            onRegister={(userData) => {
              // Handle user registration logic and API call here
              // After successful registration, you can close the modal
              setShowModal(false);
              // You can display a success message or perform any other actions if needed.
              // toast.success('User Registered Successfully');
              // fetchUsers();
            }}
          />
        )}


      </div>
    </div>

  );
};

export default MEUsers;
