import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import FormContainer from '../components/FormContainer';
import { useDispatch, useSelector } from 'react-redux';
import { useLoginMutation } from '../slices/usersApiSlice';
import { setCredentials } from '../slices/authSlice';
import { toast } from 'react-toastify';
import Loader from '../components/Loader';
import { Form, Button, Row, Col, Modal } from 'react-bootstrap'; // Import Modal from react-bootstrap


const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [showModal, setShowModal] = useState(false); // State to control the modal visibility
  const [resetemail, setResetEmail] = useState('')

  const validateEmail = () => {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!emailPattern.test(email)) {
      setEmailError('Please enter a valid email address.');
    } else {
      setEmailError('');
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
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [login, { isLoading }] = useLoginMutation();

  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (userInfo) {
      navigate('/');
    }
  }, [navigate, userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();

    validateEmail();
    validatePassword();

    try {
      const res = await login({ email, password }).unwrap();
      dispatch(setCredentials({
        ...res,
        phone: res.phone, // Assuming `res` has a `phone` property
        preference: res.preference,
      }));
      navigate('/');
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/users/forgetpassword', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ resetemail }), // Send the email as the payload
      });

      // Check the response status to handle success or failure
      if (response.ok) {
        toast.success('Password reset email sent successfully.');
        handleCloseModal();
      } else {
        // Handle the error when the API call fails
        const errorData = await response.json();
        toast.error(errorData.message || 'Failed to reset password. Please try again.');
      }
    } catch (error) {
      // Handle network errors or other exceptions
      toast.error('Failed to reset password. Please try again.');
    }
  };


  return (
    <FormContainer>
      <section className="body-tag vh-100 login-s">
        <div className="container login-container text-black card shadow ">
          <div className="row d-flex align-items-center justify-content-center">
            <div className="col-md-5">
              <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
                className="img-fluid " alt="Phone_image" />
            </div>
            <div className="col-md-5">
              <form onSubmit={submitHandler}>
                {/* Email input */}
                <div className="form-outline mb-3">
                  <input type="email" name='email' id="form1Example13" className="form-control form-control-lg"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onBlur={validateEmail}
                    placeholder='Enter Email'

                  />
                  <label className="form-label" htmlFor="form1Example13">Email address</label>
                  {emailError && <div className="text-danger">{emailError}</div>}
                </div>

                {/* Password input */}
                <div className="form-outline mb-3">
                  <input type="password" name='password' id="form1Example23" className="form-control form-control-lg"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onBlur={validatePassword}
                    placeholder='Enter password'

                  />
                  <label className="form-label" htmlFor="form1Example23">Password</label>
                  {passwordError && <div className="text-danger">{passwordError}</div>}
                </div>

                {/* Forgot password link */}
                <div className="d-flex justify-content-around align-items-center mb-4">
                  {/* Show the modal when the "Forgot password?" link is clicked */}
                  <a href="#!" onClick={handleShowModal}>
                    Forgot password?
                  </a>
                </div>


                {/* Submit button */}
                <button
                  disabled={isLoading}
                  type="submit"
                  className="btn btn-primary btn-lg btn-block w-100">
                  Sign in
                </button>

                <div className="divider d-flex align-items-center my-4">
                  <p className="text-center fw-bold mx-3 mb-0 text-muted">OR</p>
                </div>

                <div className='d-flex justify-content-between'>
                  <a className=" btn btn-primary btn-lg" style={{ backgroundColor: '#3b5998' }} href="#!" role="button">
                    Continue with Facebook
                  </a>
                  <a className="btn btn-primary btn-lg" style={{ backgroundColor: '#55acee', marginLeft: "auto" }} href="#!" role="button">
                    Continue with Twitter
                  </a>
                </div>
              </form>
              {isLoading && <Loader />}

            </div>
          </div>
        </div>
      </section>
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Reset Password</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* Text message */}
          <p>Enter email address to reset your password:</p>
          {/* Input field */}
          <input
            type="email"
            name="email"
            className="form-control"
            value={resetemail}
            onChange={(e) => setResetEmail(e.target.value)}
            onBlur={validateEmail}
            placeholder="Enter Email"
          />
          {emailError && <div className="text-danger">{emailError}</div>}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          {/* Submit button */}
          <Button variant="primary" onClick={handleResetPassword}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>

    </FormContainer>
  );
};

export default LoginScreen;
