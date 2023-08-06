// ResetPasswordScreen.js

import React, { useState ,useEffect} from 'react';
import { useParams } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';

const ResetPasswordScreen = () => {
  // const { token } = useParams();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [token, setToken] = useState("");

  useEffect(() => {
    const currentURL = new URL(window.location.href);
    const token = currentURL.pathname.split("/updatepassword/")[1];
    setToken(token);
  }, []);
  // console.log(token)

  const handleResetPassword = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      const response = await axios.put(`/api/users/updatepassword`, {token, password });
      alert(response.data.message);
      // Redirect to login screen or any other desired route after successful password reset
    } catch (error) {
      setError('Failed to reset password. Please try again.');
    }
  };

  return (
    <div>
      <h2>Reset Password</h2>
      <Form onSubmit={handleResetPassword}>
        <Form.Group controlId="password">
          <Form.Label>New Password</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group controlId="confirmPassword">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </Form.Group>
        {error && <div className="text-danger">{error}</div>}
        <Button type="submit">Reset Password</Button>
      </Form>
    </div>
  );
};

export default ResetPasswordScreen;
