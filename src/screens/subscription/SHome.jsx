import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useAddSubscriptionMutation } from '../../slices/usersApiSlice.js';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { setCredentials } from '../../slices/authSlice.js';
import Modal from 'react-modal';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';


const SHome = () => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.auth);
  const [addSubscription, { loading, error }] = useAddSubscriptionMutation();
  const dispatch = useDispatch();

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
  };

  const AddSubscription = async (e) => {
    e.preventDefault();

    if (!selectedOption) {
      toast.error('Please select a subscription option.', { autoClose: 3000 });
      return;
    }

    const subscriptionData = {
      userid: userInfo._id,
      startDate: new Date(),
      endDate: null, // Initialize it as null
      active: true,
    };

    if (selectedOption === '7days') {
      subscriptionData.endDate = calculateEndDate("7days");
    } else if (selectedOption === '3months') {
      subscriptionData.endDate = calculateEndDate("3months");
    } else if (selectedOption === 'lifetime') {
      subscriptionData.endDate = calculateEndDate("lifetime");;
    }

    const data = {
      _id: userInfo._id,
      preference: userInfo.preference,
      phone: userInfo.phone,
      email: userInfo.email,
      name: userInfo.name,
      active: subscriptionData.active,
      endDate: subscriptionData.endDate === 'lifetime' ? 'lifetime' : subscriptionData.endDate.toISOString(),
    };
    dispatch(setCredentials(data));

    try {
      const res = await addSubscription(subscriptionData);
      toast.success('You Are Now Subscribed');
      navigate('/submainhome');
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  const handleApprovePayment = async (data, actions) => {
    try {
      // Perform actions after the payment is approved
      // For example, you can update the database with the subscription information
      const subscriptionData = {
        userid: userInfo._id,
        startDate: new Date(),
        endDate: null, // Initialize it as null
        active: true,
      };
  
      if (selectedOption === '7days') {
        subscriptionData.endDate = calculateEndDate('7days');
      } else if (selectedOption === '3months') {
        subscriptionData.endDate = calculateEndDate('3months');
      } else if (selectedOption === 'lifetime') {
        subscriptionData.endDate = calculateEndDate('lifetime');
      }
  
      const data = {
        _id: userInfo._id,
        preference: userInfo.preference,
        phone: userInfo.phone,
        email: userInfo.email,
        name: userInfo.name,
        active: subscriptionData.active,
        endDate: subscriptionData.endDate === 'lifetime' ? 'lifetime' : subscriptionData.endDate.toISOString(),
      };
      dispatch(setCredentials(data));
  
      const res = await addSubscription(subscriptionData);
      toast.success('You Are Now Subscribed');
      navigate('/submainhome');
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
  };
  
  const handleError = (error) => {
    // Handle payment errors
    console.error('Payment Error:', error);
    toast.error('Payment Error. Please try again later.');
  };
  
  const calculateEndDate = (option) => {
    const currentDate = new Date();

    if (option === '7days') {
      const endDate = new Date(currentDate);
      endDate.setDate(currentDate.getDate() + 7);
      return endDate;
    } else if (option === '3months') {
      const endDate = new Date(currentDate);
      endDate.setMonth(currentDate.getMonth() + 3);
      return endDate;
    } else if (option === 'lifetime') {
      // Set a long duration for lifetime subscription (e.g., 100 years from now)
      const endDate = new Date(currentDate);
      endDate.setFullYear(currentDate.getFullYear() + 100);
      return endDate;
    }

    return currentDate; // Default: Return the current date if no option is selected
  };

  const calculatePrice = (selectedOption) => {
    if (selectedOption === '7days') {
      return '9.99';
    } else if (selectedOption === '3months') {
      return '29.99';
    } else if (selectedOption === 'lifetime') {
      return '99.99';
    }
  
    return '0'; // Default: Return 0 if no option is selected
  };
  

  return (
    <div className='body-tag shome'>
      <h1 className='Sub-title pt-5'>Subscription Page</h1>

      <div className="subscription-container">
        <div
          className={`subscription-card ${selectedOption === '7days' ? 'selected' : ''}`}
          onClick={() => handleOptionSelect('7days')}
        >
          <h3>7 Days Subscription</h3>
          <p>Price: $9.99</p>
          <div className="inner-card">
            <h4>Features:</h4>
            <ul>
              <li>Access to Magic Entertainment Videos</li>
              <li>Unlimited Uploads</li>
            </ul>
          </div>
          <div className='select-button'>
            <button >{selectedOption === '7days' ? 'Selected' : 'Select'}</button>
          </div>
        </div>

        <div
          className={`subscription-card ${selectedOption === '3months' ? 'selected' : ''}`}
          onClick={() => handleOptionSelect('3months')}
        >
          <h3>3 Months Subscription</h3>
          <p>Price: $29.99</p>
          <div className="inner-card">
            <h4>Features:</h4>
            <ul>
              <li>Access to Magic Entertainment Videos</li>
              <li>Unlimited Uploads</li>
              <li>Exclusive features and updates</li>
              <li>Priority customer support</li>
            </ul>
          </div>
          <div className='select-button'>
            <button >{selectedOption === '3months' ? 'Selected' : 'Select'}</button>
          </div>
        </div>

        <div
          className={`subscription-card ${selectedOption === 'lifetime' ? 'selected' : ''}`}
          onClick={() => handleOptionSelect('lifetime')}
        >
          <h3>Lifetime Subscription</h3>
          <p>Price: $99.99</p>
          <div className="inner-card">
            <h4>Features:</h4>
            <ul>
              <li>Access to Magic Entertainment Videos</li>
              <li>Unlimited Uploads</li>
              <li>Exclusive features and updates</li>
              <li>Priority customer support</li>
              <li>No expiry</li>
            </ul>
          </div>
          <div className='select-button'>
            <button >{selectedOption === 'lifetime' ? 'Selected' : 'Select'}</button>
          </div>
        </div>
      </div>

      {selectedOption && (
        <div className='selected-option select-button'>
          <h3>Selected Option: {selectedOption}</h3>
          <button onClick={() => setIsModalOpen(true)}>Subscribe</button>
        </div>
      )}

      {/* Modal */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        contentLabel='Payment Modal'
      >
        <h2 style={{fontWeight:"bold", fontSize:"2.5rem"}} className='mb-2'>Payment Page</h2>
        <p style={{fontSize:"1.2rem"}}>Selected Option: <span style={{fontWeight:"700"}} className='text-success'>{selectedOption}</span></p>
        <PayPalScriptProvider options={{ 'client-id': 'ATDSGAXke38nPQeADKr31CbwCNMbknXVpdyswqcOoeTkrmdMULzmnTSGSQFfSu_ETDLKdMG5SZBfgzpb' }}>
        <PayPalButtons
            createOrder={(data, actions) => {
              // Customize this function to create an order or payment on your server
              // For simplicity, we'll use the PayPal SDK to create an order on the client side
              return actions.order.create({
                purchase_units: [
                  {
                    amount: {
                      value: calculatePrice(selectedOption), // Pass the selected option to calculate the price
                    },
                  },
                ],
              });
            }}
            onApprove={handleApprovePayment}
            onError={handleError}
            style={{ layout: 'vertical',  }}
          />

        </PayPalScriptProvider>
        <button className='btn btn-danger centered-text' style={{marginLeft:"0%"}} onClick={() => setIsModalOpen(false)}>Close</button>
      </Modal>
    </div>
  );
};

export default SHome;