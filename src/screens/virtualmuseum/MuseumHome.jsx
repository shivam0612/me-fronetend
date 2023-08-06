import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Card, Row, Col, Spin } from 'antd';

const MuseumHome = () => {
  const [artworks, setArtworks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/users/getartworks');
        if (!response.ok) {
          throw new Error('An error occurred while fetching data.');
        }

        const responseData = await response.json();
        setArtworks(responseData);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setError('An error occurred while fetching data.');
        setLoading(false);
      }
    };

    fetchData();
  }, []);


  const handleCardClick = (artwork) => {
    fetchAdditionalInfo(artwork.title, artwork.principalOrFirstMaker)
      .then((additionalInfo) => {
        toast.info(
          <div className='text-center'>
            <h6><b>{additionalInfo.title}</b></h6>
            <p><b>Artist:</b> {additionalInfo.artist}</p>
            <p>{additionalInfo.additionalDetails}</p>
          </div>
        );
      })
      .catch((error) => {
        console.error(error);
        toast.error('Failed to fetch additional information.');
      });
  };

  const fetchAdditionalInfo = async (title, artist) => {
    try {
      const apiKey = 'AIzaSyABSZM6Xj8uqQI9PBHC75Yyi8n27if3eJM';
      const cx = '45613d8091dc4405b'; // engine id
      const searchQuery = `${title} by ${artist}`;

      const response = await axios.get('https://www.googleapis.com/customsearch/v1', {
        params: {
          key: apiKey,
          cx,
          q: searchQuery,
        },
      });

      const responseData = response.data;
      console.log(response.data); // Log the response data

      const items = responseData.items || [];
      const additionalDetails = items.length > 0 ? items[0].snippet : 'No additional details available.';

      const additionalInfo = {
        title,
        artist,
        additionalDetails,
      };

      console.log(additionalInfo)
      return additionalInfo;
    } catch (error) {
      throw new Error('Failed to fetch additional information.');
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <section className='body-tag museum-page'>
      {/* Add Header */}
      <header>
        <h1 className='museum-title pt-5 ' style={{}}>Online Virtual Museum</h1>
        {/* Add any additional content or logo */}
      </header>

      <div className='museum-container'>
        {/* Display loading spinner while loading */}
        {loading ? (
          <div className='loading-spinner'>
            <Spin size='large' />
          </div>
        ) : (
          <div className='museum-card'>
            <Row gutter={[16, 16]}>
              {artworks.map((artwork) => (
                <Col span={8} key={artwork.id}>
                  <Card
                    className='artwork-card'
                    onClick={() => handleCardClick(artwork)}
                  >
                    <img
                      src={artwork.webImage.url}
                      alt={artwork.title}
                      style={{ width: '100%' }}
                    />
                    <div className='artwork-desc'>
                      <p className='artwork-title'>{artwork.title}</p>
                      <p className='artwork-title'>
                        <strong>Artist: </strong>
                        {artwork.principalOrFirstMaker}
                      </p>
                    </div>
                  </Card>
                </Col>
              ))}
            </Row>
          </div>
        )}
      </div>

  
      {/* Toast container component */}
      <ToastContainer />
    </section>
  );
};

export default MuseumHome;
