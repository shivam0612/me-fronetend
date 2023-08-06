import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Home = () => {
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.auth);
  const [subscriptionDates, setSubscriptionDates] = useState(null);

  useEffect(() => {
    const fetchData = async (id) => {
      try {
        const response = await axios.get(`/api/users/getsubscription/${userInfo._id}`);
        const data = response.data; // Get the response data directly

        setSubscriptionDates({
          startDate: data.startDate.toString().substring(0, 10),
          endDate: data.endDate ? data.endDate.toString().substring(0, 10) : null,
          active: data.active,
        });

      } catch (error) {
        console.error('Error fetching data:', error);
        console.log('Error response:', error.response); // Log the response object for more details
        setSubscriptionDates(null); // Set to null if no subscription found
      }
    };

    fetchData();
  }, [userInfo._id]);

  const AddSubscription = () => {
    navigate('/shome');
  };

  const DelSubscription = async () => {
    try {
      const response = await axios.delete(`/api/users/deletesubscription/${userInfo._id}`);
      toast.warning('Subscription deleted successfully', { autoClose: 3000 }); // Show success message
      navigate('/shome');
    } catch (error) {
      toast.error('Error deleting subscription', { autoClose: 3000 }); // Show error message
    }
  };

  const getEndDate = () => {
    if (!subscriptionDates) return null;

    if (subscriptionDates.endDate > "2100-01-01T00:00:00.000Z") {
      return 'Lifetime';
    } else {
      return subscriptionDates.endDate;
    }
  };

  return (
    <div className="subscriptions-container">
      <h1 className="subscriptions-title">Subscription Details</h1>

      {subscriptionDates ? (
        <div className="subscriptions-card mt-5 mb-5 shadow">
          <div className="subscriptions-card-body">
            <h5 className="subscriptions-card-title">Subscription Dates</h5>
            <div className="subscriptions-details">
              <div className="subscriptions-detail">
                <strong>Start Date:</strong>
                <span id="startDate">{subscriptionDates.startDate}</span>
              </div>
              <div className="subscriptions-detail">
                <strong>End Date:</strong>
                <span id="endDate">{getEndDate()}</span>
              </div>
              <div className="subscriptions-detail">
                <strong>Active:</strong>
                <span id="active" className='text-capitalize'>{subscriptionDates.active.toString()}</span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="no-subscription-message">
          <h3>No Subscription Available</h3>
        </div>
      )}
      <div className="subscriptions-actions">
        <button className="subscriptions-button subscriptions-button-primary" onClick={AddSubscription}>
          Add Subscription
        </button>
        {subscriptionDates && (
          <button className="subscriptions-button subscriptions-button-danger" onClick={DelSubscription}>
            Delete Subscription
          </button>
        )}
      </div>
    </div>
  );
};

export default Home;
