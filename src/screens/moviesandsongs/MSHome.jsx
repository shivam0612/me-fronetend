import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useGetVideosQuery } from '../../slices/videoApiSlice';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { FaRegSadTear, FaDownload } from 'react-icons/fa'; // Import the sad tear icon
import img from '../../images/download-icon.png';

const MSHome = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [videos, setVideos] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [activeSection, setActiveSection] = useState('online');
  const [isYouTubeVideo, setIsYouTubeVideo] = useState(true);
  const navigate = useNavigate()
  const { userInfo } = useSelector((state) => state.auth);

  const { data: videoss, isLoading, isError, refetch } = useGetVideosQuery(userInfo._id);

  const onlineVideoBtnClass = activeSection === 'online' ? 'active-button' : '';
  const meVideoBtnClass = activeSection === 'me' ? 'active-button' : '';


  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await refetch();
        // console.log(res)
        setIsSubscribed(res.data.videos !== null);

     
      } catch (error) {
        console.log(error);
        alert('Error occurred while fetching data');
      }
    };

    fetchData();
  }, []);
    const [isSubscribed, setIsSubscribed] = useState(true);
   

  const handleAddVideos = () => {
    navigate('/video/upload');
  };


  const handleSearch = async () => {
    try {
      const response = await axios.get(
        `https://www.googleapis.com/youtube/v3/search?key=AIzaSyCSHTFvOfMLUKXXQCZHsCVT6uyLZqf5Ykk&part=snippet&type=video&q=${searchQuery}&maxResults=100`
      );

      setVideos(response.data.items);
      setSelectedVideo(null);
    } catch (error) {
      console.log(error);
    }
  };

  const openVideo = (videoId) => {
    if (videoId.startsWith('http')) {
      setSelectedVideo(videoId);
      setIsYouTubeVideo(false);
    } else {
      setSelectedVideo(videoId);
      setIsYouTubeVideo(true);
    }
  };
  const subscribenow = () => {
    navigate('/submainhome')
  }

  const renderVideos = () => {
    if (videos.length === 0) {
      return <p>No videos found.</p>;
    }

    const handleDownload = (videoId) => {
      window.open(videoId, '_blank'); // Open the modified URL in a new tab
    };
    const isAudioFile = (filePath) => /\.(mp3|m4a)$/i.test(filePath);

    return videos.map((video) => (
      <div
        key={video.id.videoId}
        className="card-mshome card p-2 mb-3 shadow"
        style={{ height: "max-content" }}
        onClick={() => openVideo(video.id.videoId)}
      >
        <div className="row no-gutters">
          <div className="col-md-4">
            <div className="position-relative">
              <img
                src={video.snippet.thumbnails.medium.url}
                className="card-img-mshome"
                alt={video.snippet.title}
                style={{ height: "9rem" }}
              />
            </div>
          </div>
          <div className="col-md-8">
            <div className="card-body">
              <h5 className="card-title" style={{ marginBottom: '8px', maxHeight: '3rem', overflow: 'hidden', textOverflow: 'ellipsis' }}>{video.snippet.title}</h5>
              <p style={{ marginBottom: '8px', maxHeight: '3rem', overflow: 'hidden', textOverflow: 'ellipsis' }} className="card-text">{video.snippet.description}</p >
              <button className="download-btn border-0" style={{ backgroundColor: "transparent" }} onClick={() => handleDownload(`https://www.ssyoutube.com/watch?v=${video.id.videoId}`)}>
                <img height={30} width={30} src={img} alt='img-download' />
              </button>
            </div>
          </div>
        </div>
      </div>
    ));
  };

  const renderVideosFromDatabase = () => {

    if (isLoading) {
      return <p>Loading videos...</p>;
    }

    if (isError) {
      return <p>Error occurred while fetching videos.</p>;
    }

    if (!videoss || videoss.length === 0) {
      return <p>No videos found.</p>;
    }

    if (videoss.videos === null) {
      return (
        <div className='text-center my-5 p-3 shadow card' style={{ width: "100%", textAlign: "center", alignContent: "center", alignItems: "center" }}>
          <FaRegSadTear size={50} className='text-danger' />
          <h3 className='mt-2 border-light'>You Are Not Subscribed</h3>
          <button onClick={subscribenow} className='subscribe-btn '>
            Subscribe Now
          </button>
        </div>
      );
    }

    const handleDownload = async (videoId, title) => {
      try {
        const response = await fetch(videoId);
        const blob = await response.blob();
        // console.log(response)
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${title}.mp4`; // You can customize the filename here, e.g., 'my_video.mp4'
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      } catch (error) {
        console.log('Error while downloading video:', error);
      }
    };


    return videoss.videos.map((video) => (
      <div
        key={video._id}
        className="card mb-3 p-2 shadow"
        style={{ width: '80%', margin: 'auto', height: "max-content" }}
      >
        <div className="row no-gutters">
          <div className="col-md-4">
            <div className="position-relative">
              <img
                src={`${video.thumbnail}`}
                className="card-img shadow"
                alt={video.title}
                onClick={() => openVideo(`http://localhost:5000/${video.filePath}`)}
              />
              <p className='pt-1 mb-1 mt-1'>User: {video.user}</p>

              {/* {`http:localhost:5000/${video.filePath}`} */}
            </div>
          </div>
          <div className="col-md-8">
            <div className="card-body">
              <h5 className="card-title" style={{ marginBottom: '8px', maxHeight: '3rem', overflow: 'hidden', textOverflow: 'ellipsis' }}>{video.title}</h5>
              <p className="card-text" style={{ overflow: "hidden" }}>{video.description}</p>
              <button className="download-btn border-0" style={{ backgroundColor: "transparent" }} onClick={() => handleDownload(`http://localhost:5000/${video.filePath}`, `${video.title}`)}>
                <img height={30} width={30} src={img} alt='img-download' />
              </button>
            </div>
          </div>
        </div>
      </div>
    ));
  };

  const handleOnlineVideosClick = () => {
    setActiveSection('online');
    setIsYouTubeVideo(true);
  };

  const handleMeVideosClick = () => {
    setActiveSection('me');
    setIsYouTubeVideo(true);
  };
  const isAudioFile = (filePath) => /\.(mp3|m4a)$/i.test(filePath);



  return (
    <div style={{ width: '90%', margin: 'auto' }}>
      <div style={{ display: 'flex' }}>
        <div style={{ flex: '1' }} className="mt-5 ms-5">
          {/* Video Player */}
          {isYouTubeVideo ? (
            selectedVideo ? (
              <div>
                <iframe
                  width="600"
                  height="400"
                  style={{ borderRadius: "5px", shadow: "1px 2px 4px black" }}
                  className='shadow'
                  src={`https://www.youtube.com/embed/${selectedVideo}`}
                  title="YouTube video player"
                  frameBorder="0"
                  allowFullScreen
                ></iframe>
                {isAudioFile(selectedVideo) && (
                  <div
                    className="audio-background"
                    style={{
                      backgroundColor: 'red',
                      // Add other custom styles for the background container
                    }}
                  />
                )}

              </div>
            ) : (
              <div>
                <img
                  src="https://media.giphy.com/media/94P1LEMyuVEeA/giphy.gif"
                  alt="GIF"
                  width="600"
                  height="400"
                  style={{ borderRadius: "5px", shadow: "1px 2px 4px black" }}
                  className='player shadow'
                />
              </div>
            )
          ) : (

            selectedVideo && (

              <div className=''>
                <video className='player' width="560" height="315" controls>
                  <source src={selectedVideo} type="video/mp4" />
                </video>
              </div>
            )
          )}

          <div style={{ width: '560px', justifyContent: 'space-evenly', display: 'flex', flexWrap: 'wrap' }}>
            <button className='closevideo-btn' onClick={() => setSelectedVideo(null)}>
              Close Video
            </button>
            {isSubscribed ? (
              <button
                className="addvideo-btn"
                onClick={handleAddVideos}
              >
                Add Videos | Song
              </button>
            )
              :
              (
                <button
                  className="addvideo-btn"
                  onClick={handleAddVideos}
                  disabled
                >
                  Add Videos | Song
                </button>
              )}
          </div>
        </div>
        <div className="pt-5" style={{ flex: '1', textAlign: 'center' }}>
          {activeSection === 'online' ? (
            <div>
              <div>
                <button className='onlinevideo-btn bg-info' onClick={handleOnlineVideosClick}>
                  Online Videos
                </button>
                <button className='mevideo-btn bg-info' onClick={handleMeVideosClick}>ME Videos</button>
              </div>
              <h2 className='sidebar-feature-title'>Search Videos Online</h2>
              <div className="mt-3 mb-4">
                <input className='input-sft'
                  type="text"
                  placeholder="Search videos..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button
                  style={{
                    display: 'inline-block',
                    padding: '10px 20px',
                    marginLeft: '20px',
                    backgroundColor: '#ADD8E6',
                    color: 'white',
                    fontFamily: 'sans-serif',
                    fontStyle: 'bold',
                    textDecoration: 'none',
                    borderRadius: '4px',
                    transition: 'background-color 0.3s ease',
                    marginTop: '1rem'

                  }}
                  className='bg-primary'
                  onClick={handleSearch}>
                  Search
                </button>
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0%' }}>{renderVideos()}</div>
            </div>
          ) : (
            <div>
              <div>
                <button className='onlinevideo-btn' onClick={handleOnlineVideosClick}>
                  Online Videos
                </button>
                <button onClick={handleMeVideosClick} className='mevideo-btn'>ME Videos</button>
              </div>
              <h2 className='sidebar-feature-title'>ME Videos</h2>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0%' }}>

                {renderVideosFromDatabase()}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MSHome;
