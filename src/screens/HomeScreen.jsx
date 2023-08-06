import React, { useState, useEffect } from 'react';
import { Container, Card, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBold, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

const HomeScreen = () => {

  const images = [
    // Add your image URLs here
    'https://images.unsplash.com/photo-1552820728-8b83bb6b773f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
    'https://img.freepik.com/free-vector/cinema-movie-illustration_24908-57118.jpg?w=740&t=st=1688944189~exp=1688944789~hmac=c299f60948806e79623d5a2d99771b817e9c9d409fcc80e59825a2a8c44513ee',
    'https://images.unsplash.com/photo-1513038630932-13873b1a7f29?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8TXVzZXVtfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60',
    // Add more images as needed
  ];
  const navigate = useNavigate()
  const services = [
    {
      title: 'Online Games',
      description: 'Explore a wide variety of online games and enjoy hours of entertainment.',
      path: '/gamehome',
    },
    {
      title: 'Online Movies',
      description: 'Watch the latest movies and shows online from the comfort of your home.',
      path: '/homepageofms',
    },
    {
      title: 'Virtual Museum',
      description: 'Explore historical artifacts and artworks through our immersive virtual museum experience.',
      path: '/mhome',
    },
    // Add more services as needed
  ];

  const handleServiceClick = (path) => {
    navigate(path); // Redirect to the respective service page
  };

  const renderServiceItems = () => {
    return images.map((image, index) => (
      <Card className="service-item mx-3 border-0" key={index} style={{cursor:"pointer"}}>
        <Card.Img onClick={() => handleServiceClick(services[index].path)} className='shadow' variant="top" src={image} alt={`Service ${index + 1}`} />
        <Card.Body>
          <Card.Title className='fw-bold'>{services[index].title}</Card.Title>
          <Card.Text style={{height:"5rem"}}>{services[index].description}</Card.Text>
        </Card.Body>
      </Card>
    ));
  };

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    // Function to auto-slide images every 3 seconds (adjust the interval as needed)
    const slideTimer = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);

    return () => clearInterval(slideTimer);
  }, [images.length]);

  const [showGlobalChat, setShowGlobalChat] = useState(false);
  const [showInterestChat, setShowInterestChat] = useState(false);

  const handleGlobalChatClick = () => {
    setShowGlobalChat(true);
    setShowInterestChat(false);
    navigate('/chathome?showGlobalChat=false'); // Step 3: Navigate to '/chathome' page

  };

  const handleInterestChatClick = () => {
    setShowInterestChat(true);
    setShowGlobalChat(false);
    navigate('/chathome?showGlobalChat=true'); // Step 3: Navigate to '/chathome' page

  };

  const openbutton = () => {
    navigate('/contact')
  }

  
  return (
    <>
      <div className="container-fluid home" >
        <div className="left-side"></div>
        <div className="right-side"></div>
        <div className="welcome-text text-center ">
          <span>
            <p className='mb-2 '>Welcome To Our Portal</p>
            <a href='#service' className='text-decoration-none'>
              <FontAwesomeIcon
                icon={faChevronDown}
                size="3x"
                style={{ color: 'black' }}
                className='pt-3'
                bounce />
            </a>
          </span>
        </div>
        <div className="backwrap gradient">
          <div className="back-shapes">
            <span className="floating circle" style={{ top: '66.59856996935649%', left: '13.020833333333334%', animationDelay: '-0.9s' }}></span>
            <span className="floating triangle" style={{ top: '31.46067415730337%', left: '33.59375%', animationDelay: '-4.8s' }}></span>
            <span className="floating cross" style={{ top: '76.50663942798774%', left: '38.020833333333336%', animationDelay: '-4s' }}></span>
            <span className="floating square" style={{ top: '21.450459652706844%', left: '14.0625%', animationDelay: '-2.8s' }}></span>
            <span className="floating square" style={{ top: '58.12053115423902%', left: '56.770833333333336%', animationDelay: '-2.15s' }}></span>
            <span className="floating square" style={{ top: '8.682328907048008%', left: '72.70833333333333%', animationDelay: '-1.9s' }}></span>
            <span className="floating cross" style={{ top: '31.3585291113381%', left: '58.541666666666664%', animationDelay: '-0.65s' }}></span>
            <span className="floating cross" style={{ top: '69.96935648621042%', left: '81.45833333333333%', animationDelay: '-0.4s' }}></span>
            <span className="floating circle" style={{ top: '15.117466802860061%', left: '32.34375%', animationDelay: '-4.1s' }}></span>
            <span className="floating circle" style={{ top: '13.074565883554648%', left: '45.989583333333336%', animationDelay: '-3.65s' }}></span>
            <span className="floating cross" style={{ top: '55.87334014300306%', left: '27.135416666666668%', animationDelay: '-2.25s' }}></span>
            <span className="floating cross" style={{ top: '49.54034729315628%', left: '53.75%', animationDelay: '-2s' }}></span>
            <span className="floating cross" style={{ top: '34.62717058222676%', left: '49.635416666666664%', animationDelay: '-1.55s' }}></span>
            <span className="floating cross" style={{ top: '33.19713993871297%', left: '86.14583333333333%', animationDelay: '-0.95s' }}></span>
            <span className="floating square" style={{ top: '28.19203268641471%', left: '25.208333333333332%', animationDelay: '-4.45s' }}></span>
            <span className="floating circle" style={{ top: '39.7344228804903%', left: '10.833333333333334%', animationDelay: '-3.35s' }}></span>
            <span className="floating triangle" style={{ top: '77.83452502553627%', left: '24.427083333333332%', animationDelay: '-2.3s' }}></span>
            <span className="floating triangle" style={{ top: '2.860061287027579%', left: '47.864583333333336%', animationDelay: '-1.75s' }}></span>
            <span className="floating triangle" style={{ top: '71.3993871297242%', left: '66.45833333333333%', animationDelay: '-1.25s' }}></span>
            <span className="floating triangle" style={{ top: '31.256384065372828%', left: '76.92708333333333%', animationDelay: '-0.65s' }}></span>
            <span className="floating triangle" style={{ top: '46.47599591419816%', left: '38.90625%', animationDelay: '-0.35s' }}></span>
            <span className="floating cross" style={{ top: '3.4729315628192032%', left: '19.635416666666668%', animationDelay: '-4.3s' }}></span>
            <span className="floating cross" style={{ top: '3.575076608784474%', left: '6.25%', animationDelay: '-4.05s' }}></span>
            <span className="floating cross" style={{ top: '77.3237997957099%', left: '4.583333333333333%', animationDelay: '-3.75s' }}></span>
            <span className="floating cross" style={{ top: '0.9193054136874361%', left: '71.14583333333333%', animationDelay: '-3.3s' }}></span>
            <span className="floating square" style={{ top: '23.6976506639428%', left: '63.28125%', animationDelay: '-2.1s' }}></span>
            <span className="floating square" style={{ top: '81.30745658835546%', left: '45.15625%', animationDelay: '-1.75s' }}></span>
            <span className="floating square" style={{ top: '60.9805924412666%', left: '42.239583333333336%', animationDelay: '-1.45s' }}></span>
            <span className="floating square" style={{ top: '29.009193054136876%', left: '93.90625%', animationDelay: '-1.05s' }}></span>
            <span className="floating square" style={{ top: '52.093973442288046%', left: '68.90625%', animationDelay: '-0.7s' }}></span>
            <span className="floating square" style={{ top: '81.51174668028601%', left: '83.59375%', animationDelay: '-0.35s' }}></span>
            <span className="floating square" style={{ top: '11.542390194075587%', left: '91.51041666666667%', animationDelay: '-0.1s' }}></span>
          </div>
        </div>

      </div>

      <div id='service' className='vh-100 service-section text-center' style={{ alignItems: "center", display: "flex" }}>
        <Container>
          <h2 className='mt-0'>Our Services</h2>
          <div className="mt-4 d-flex justify-content-center">
            {renderServiceItems()}
          </div>
        </Container>
      </div>

      {/* Chat section */}
      <div className="chat-section text-center bg-chat" >
        
        <Container>
          <h2 className='chatname mb-5 ' >Chat Features</h2>
          <div className=" d-flex justify-content-center">
            <Card className="chat-option mx-3 border-0">
              <Card.Body>
                <Card.Title className='fw-bold'>Chat with Global Users</Card.Title>
                <Card.Text>
                  Chat with users from all around the world and make new friends.
                </Card.Text>
                <Button variant="primary" onClick={handleGlobalChatClick}>
                  Start Global Chat
                </Button>
              </Card.Body>
            </Card>
            <Card className="chat-option mx-3 border-0">
              <Card.Body>
                <Card.Title className='fw-bold'>Chat with Similar Interest Users</Card.Title>
                <Card.Text>
                  Connect with users who share similar interests and hobbies.
                </Card.Text>
                <Button variant="primary" onClick={handleInterestChatClick}>
                  Find Interest Chat
                </Button>
              </Card.Body>
            </Card>

          </div>

          {/* Chat components based on user selection */}
        </Container>

        <div className=' contact-section text-center'>
          <Container>
            <h2 className='contactsec'>Contact Us</h2>
            
            <div className="pt-4 contactsecdiv">
              <p>If you have any questions or need assistance, feel free to contact us:</p>
              <Button variant="primary" onClick={openbutton}>Contact</Button>
            </div>
          </Container>
        </div>
      </div>

    </>
  );
};

export default HomeScreen;
