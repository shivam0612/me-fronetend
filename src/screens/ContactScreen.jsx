import { React, useState } from 'react';
import FormContainer from './../components/FormContainer';
import axios from 'axios';
import { toast } from 'react-toastify';

const ContactScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState(''); // Added subject state
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create the request payload
    const payload = {
      name: name,
      email: email,
      subject: subject, // Include subject in the payload
      message: message,
    };

    try {
      // Make the POST request to the API endpoint
      await axios.post('/api/users/contact', payload);

      // Handle successful submission
      toast.success('Email Sent Successfully');

      // Reset the form fields after submission
      setName('');
      setEmail('');
      setSubject(''); // Reset subject state
      setMessage('');
      setError('');
    } catch (error) {
      // Handle error
      console.error('Failed to submit contact form', error);
      setError('Failed to submit contact form. Please try again later.');
      // Optionally, show an error message to the user
    }
  };

  return (
    <FormContainer>
      <div className="contact-form-wrapper unique-contact-form-wrapper d-flex justify-content-center">
        <form onSubmit={handleSubmit} className="contact-form shadow unique-contact-form">
          <h5 className="title unique-title">Contact us</h5>
          <p className="description unique-description">Feel free to contact us if you need any assistance, any help, or another question.</p>
          <div>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="form-control rounded border-white mb-3 form-input unique-form-input"
              id="name"
              placeholder="Name"
              required
            />
          </div>
          <div>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-control rounded border-white mb-3 form-input unique-form-input"
              placeholder="Email"
              required
            />
          </div>
          <div>
            <input
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="form-control rounded border-white mb-3 form-input unique-form-input"
              placeholder="Subject"
              required
            />
          </div>
          <div>
            <textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="form-control rounded border-white mb-3 form-text-area unique-form-text-area"
              rows="5"
              cols="30"
              placeholder="Message"
              required
            ></textarea>
          </div>
          <div className="submit-button-wrapper  unique-submit-button-wrapper">
            <input type="submit" className="bg-primary" value="Send" />
          </div>
        </form>
      </div>
    </FormContainer>
  );
};

export default ContactScreen;
