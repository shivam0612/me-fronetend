import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
    const [artworks, setArtworks] = useState([]);
    const [imageUrls, setImageUrls] = useState([]);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const navigate = useNavigate()
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/users/getartworks');
                if (!response.ok) {
                    throw new Error('An error occurred while fetching data.');
                }
                const responseData = await response.json();
                setArtworks(responseData);
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        // Extract the image URLs from artworks and store them in the imageUrls state
        setImageUrls(artworks.map((artwork) => artwork.webImage.url));
    }, [artworks]);

    useEffect(() => {
        // Change the image every 2 seconds
        const timer = setInterval(() => {
            setCurrentImageIndex((prevIndex) => (prevIndex + 1) % imageUrls.length);
        }, 2000);

        return () => clearInterval(timer); // Clean up the timer when the component unmounts

    }, [imageUrls]);

    const handleGetStarted = () => {
        navigate('/museumhome')
    }

    return (
        <div style={{ position: 'relative', height: '100vh', overflow: 'hidden' }}>
            {imageUrls.map((imageUrl, index) => (
                <img
                    key={index}
                    src={imageUrl}
                    alt='image'
                    style={{
                        width: '100%',
                        height: '100vh',
                        objectFit: 'cover',
                        opacity: index === currentImageIndex ? 1 : 0, // Show only the current image, hide others
                        // transition: 'opacity 1s ease-in-out',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                    }}
                />
            ))}
            <div
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    height: '100%',
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <div className='text-center' style={{ boxShadow: "0px 2px 4px white", padding: "2rem", borderRadius: "10px", backgroundImage: `url('https://images.unsplash.com/photo-1622544841807-9ca22fddaba2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fGJydXNoJTIwc3Ryb2tlfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60')` }}>
                    <h1 >Welcome to the Online Virtual Museum</h1>
                    <button
                        style={{
                            padding: '15px 30px',
                            backgroundColor: '#3498db',
                            color: '#fff',
                            fontSize: '18px',
                            border: 'none',
                            cursor: 'pointer',
                            marginTop: '1rem',
                            borderRadius: '5px',
                        }}

                        onClick={handleGetStarted}
                    >
                        Get Started
                    </button>
                </div>
            </div>
        </div>
    );
};

export default HomePage;
