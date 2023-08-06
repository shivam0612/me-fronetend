import React from 'react';
import Gaming from '../images/gaming.png';
import karaoke from '../images/Karaoke.jpg';
import MandS from '../images/manss.jpg';
import { useNavigate } from 'react-router-dom';

const ServiceScreen = () => {
  const navigate = useNavigate();

  const handleCardClick = (serviceName) => {
    navigate(`/${serviceName}`);
  };

  return (
    <>
      <div className="custom-container body-tag vh-100">
        <h3 className="title">OUR SERVICES</h3>

        <div className="product-container">

          <div className="product shadow" data-name="p-3" onClick={() => handleCardClick('homepageofms')}>
            <img src="https://img.freepik.com/free-vector/cinema-movie-illustration_24908-57118.jpg?w=740&t=st=1688944189~exp=1688944789~hmac=c299f60948806e79623d5a2d99771b817e9c9d409fcc80e59825a2a8c44513ee" alt="" />
            <h3>Movies and Songs</h3>
            <div className="desc">Unlimited Entertainment at Your Fingertips</div>
          </div>

          <div className="product shadow" data-name="p-4" onClick={() => handleCardClick('mhome')}>
            <img
              src="https://images.unsplash.com/photo-1513038630932-13873b1a7f29?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8TXVzZXVtfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60"
              alt=""
            />
            <h3>Virtual Museum</h3>
            <div className="desc">Step into a virtual masterpiece</div>
          </div>

          <div className="product shadow" data-name="p-1" onClick={() => handleCardClick('gamehome')}>
            <img src="https://images.unsplash.com/photo-1552820728-8b83bb6b773f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80" alt="" />
            <h3>Gaming</h3>
            <div className="availability">Play, Win, Repeat, Dominate, Conquer</div>
          </div>
   
          <div className="product shadow" data-name="p-4" onClick={() => handleCardClick('others')}>
            <img
              src="https://images.unsplash.com/photo-1497005367839-6e852de72767?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=867&q=80"
              alt=""
            />
            <h3>Others</h3>
            <div className="desc">Other Features Coming Up Soon</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ServiceScreen;
