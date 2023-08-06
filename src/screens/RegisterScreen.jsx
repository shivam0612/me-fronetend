import { useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';

import FormContainer from '../components/FormContainer';
import Loader from '../components/Loader';
// import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useRegisterMutation } from '../slices/usersApiSlice';
import { setCredentials } from '../slices/authSlice';
import { toast } from 'react-toastify';

const RegisterScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [cpassword, setCpassword] = useState('');
  const [preference, setPreference] = useState('Other')
  const [phone, setPhone] = useState('')

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [register, { isLoading }] = useRegisterMutation();

  const { userInfo } = useSelector((state) => state.auth);

  // client side validation
  // FOr Validation 
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

  // MODAL
  const [isChecked, setIsChecked] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const termsUrl = 'https://pastebin.com/embed_js/dKBWhdZV';

  // Checking MODAL answer
  const handleAccept = (e) => {
    e.preventDefault();
    setIsChecked(true);
    setShowModal(false);
    PostData(e); // Pass the event object to the PostData function
  };

  const handleDecline = () => {
    setIsChecked(false);
    setShowModal(false);
  };

  useEffect(() => {
    if (userInfo) {
      navigate('/');
    }
  }, [navigate, userInfo]);

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
        dispatch(setCredentials({ ...res }));
        navigate('/');
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };
  return (
    <FormContainer>
      <section className="body-tag">
        <div className="container signup-section">
          <div className="row d-flex justify-content-center align-items-center">
            <div className="col-lg-12 col-xl-11">
              <div className="card shadow text-black signup-card">
                <div className="card-body p-md-5">
                  <div className="row justify-content-center">
                    <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                      <p className="text-center w-100 h1 fw-bold mb-5 mx-1 mx-md-4">Sign up</p>
                      <form className="mx-1 mx-md-4" onSubmit={submitHandler}>
                        <div className="d-flex flex-row align-items-center mb-2">
                          <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                          <div className="form-outline flex-fill mb-0">
                            <input
                              type="text"
                              name="name"
                              id="form3Example1c"
                              className="form-control"
                              pattern="[A-Za-z]{3,}"
                              value={name}
                              onChange={(e) => setName(e.target.value)}
                              onBlur={validateUsername}
                              required
                            />
                            <label className="form-label" htmlFor="form3Example1c">User Name</label>
                            {usernameError && <div className="text-danger">{usernameError}</div>}

                          </div>
                        </div>


                        <div className="d-flex flex-row align-items-center mb-2">
                          <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                          <div className="form-outline flex-fill mb-0">
                            <input
                              type="email"
                              name="email"
                              id="form3Example3c"
                              className="form-control"
                              value={email}
                              onBlur={validateEmail}
                              onChange={(e) => setEmail(e.target.value)}
                              required
                            />
                            <label className="form-label" htmlFor="form3Example3c">
                              Email
                            </label>
                            {emailError && <div className="text-danger">{emailError}</div>}
                          </div>
                        </div>

                        <div className="d-flex flex-row align-items-center mb-2">
                          <i className="fas fa-phone fa-lg me-3 fa-fw"></i>
                          <div className="form-outline flex-fill mb-0">
                            <input
                              type="tel"
                              name="phone"
                              id="form3Example4c"
                              className="form-control"
                              pattern="[0-9]{10}"
                              value={phone}
                              onChange={(e) => setPhone(e.target.value)}
                              onBlur={validatePhone}
                              required
                            />
                            <label className="form-label" htmlFor="form3Example4c">Phone</label>
                            {phoneError && <div className="text-danger">{phoneError}</div>}

                          </div>
                        </div>

                        <div className="form-group">
                          <select
                            className="form-select"
                            name="preference"
                            value={preference}
                            onChange={(e) => setPreference(e.target.value)}
                            id="preference"
                          >
                            <option value="Other">Other</option>
                            <option value="Music">Music</option>
                            <option value="Movies">Movies</option>
                            <option value="Games">Games</option>
                            <option value="Singing">Singing</option>
                          </select>
                          <label className="form-label" style={{ marginLeft: '1em' }} htmlFor="preference">Preference</label>
                        </div>

                        <div className="d-flex flex-row align-items-center mb-2">
                          <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                          <div className="form-outline flex-fill mb-0">
                            <input
                              type="password"
                              name="password"
                              id="form3Example4c"
                              className="form-control"
                              pattern="^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$"
                              value={password}
                              onChange={(e) => setPassword(e.target.value)}
                              onBlur={validatePassword}

                              required
                            />
                            <label className="form-label" htmlFor="form3Example4c">Password</label>
                            {passwordError && <div className="text-danger">{passwordError}</div>}

                          </div>
                        </div>

                        <div className="d-flex flex-row align-items-center mb-2">
                          <i className="fas fa-key fa-lg me-3 fa-fw"></i>
                          <div className="form-outline flex-fill mb-0">
                            <input
                              type="password"
                              name="cpassword"
                              id="form3Example4cd"
                              className="form-control"
                              pattern="^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$"
                              value={cpassword}
                              onChange={(e) => setCpassword(e.target.value)}
                              onBlur={validateConfirmPassword}
                              required
                            />
                            <label className="form-label" htmlFor="form3Example4cd">Repeat your password</label>
                            {cpasswordError && <div className="text-danger">{cpasswordError}</div>}

                          </div>
                        </div>

                        <div>
                          <div className="form-check d-flex justify-content-center mb-4 mt-4">
                            <label className="form-check-label disabled-checkbox" htmlFor="form2Example3">
                              <input
                                className="form-check-input me-2"
                                type="checkbox"
                                value=""
                                id="form2Example3c"
                                checked={isChecked}
                                disabled
                              />
                              <span className="disabled-text">I agree to all statements in{' '}</span>
                              <a href={termsUrl} onClick={(e) => { e && e.preventDefault(); setShowModal(true); }}>
                                Terms of service
                              </a>
                            </label>

                          </div>

                          <Modal show={showModal} onHide={() => setShowModal(false)}>
                            <Modal.Header closeButton>
                              <Modal.Title>Terms and Conditions</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                              {/* Fetch the terms and conditions content from the provided URL */}
                              <iframe src={termsUrl} style={{ width: '100%', height: '400px' }} title="Terms and Conditions" />
                            </Modal.Body>
                            <Modal.Footer>
                              <Button variant="primary" onClick={(e) => handleAccept(e)}>
                                Accept
                              </Button>

                              <Button variant="secondary" onClick={handleDecline}>
                                Decline
                              </Button>
                            </Modal.Footer>
                          </Modal>
                        </div>

                        <div className="d-flex justify-content-center mb-lg-4">
                          <button type="submit" className="btn btn-primary btn-lg">Register</button>
                        </div>
                        {isLoading && <Loader />}

                      </form>
                    </div>

                    <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
                      <img
                        src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
                        className="img-fluid"
                        alt="Sample_image"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </FormContainer>
  );
};

export default RegisterScreen;
