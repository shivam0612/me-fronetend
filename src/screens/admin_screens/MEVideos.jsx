import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const MEVideos = () => {
  const [videos, setVideos] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);

  // Fetch all videos from the database
  useEffect(() => {
    fetchVideos();
  }, []);

  const fetchVideos = async () => {
    try {
      const response = await fetch('/api/video/getvideostoadmin'); // Replace this with your actual API endpoint to fetch videos
      const data = await response.json();
      setVideos(data.videos);

    } catch (error) {
      toast.error('Error fetching videos:', error);
    }
  };

  const handleDelete = async (videoId) => {
    try {
      // Replace the endpoint with your actual API endpoint to delete the video
      await fetch(`/api/video/deletevideo/${videoId}`, {
        method: 'DELETE',
      });
      // Update the list of videos after deletion
      toast.success("Video Deleted Successfully");
      fetchVideos();
    } catch (error) {
      toast.error('Error deleting video:', error);
    }
  };

  const handleThumbnailClick = (video) => {
    setSelectedVideo(video);
  };

  const handleCloseModal = () => {
    setSelectedVideo(null);
  };

  return (
    <div className='body-tag2 vh-100' style={{ display: 'flex', justifyContent: 'center' }}>
      <div className='MEVideos'>
        <h1 className='MEVideos-title'>Video List</h1>
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Description</th>
              <th>Thumbnail</th>
              <th>Category</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {videos.map((video) => (
              <tr key={video._id}>
                <td>{video.title}</td>
                <td>{video.description}</td>
                <td>
                  <img
                    src={video.thumbnail}
                    alt='Thumbnail'
                    style={{ width: '100px', height: 'auto', cursor: 'pointer' }}
                    onClick={() => handleThumbnailClick(video)}
                  />
                </td>
                <td>{video.category}</td>
                <td>
                  <button className='btn btn-danger' onClick={() => handleDelete(video._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal to display the video */}
      {selectedVideo && (
        <div className="modal" style={{ display: 'block', background: 'rgba(0, 0, 0, 0.6)' }}>
          <div className="modal-content" style={{ width: '60vw', height: '70vh', margin: '10% auto', background: '#fff', padding: '20px' }}>
            <h2 style={{textAlign:'center'}}>Title: {selectedVideo.title}</h2>
            <p style={{textAlign:'center'}}>Description: {selectedVideo.description}</p>
            <video
              controls
              style={{ width: '100%', height: '40vh', borderRadius:'10px', border: '1px double lightgray' }}
            >
              <source src={`http://localhost:5000/${selectedVideo.filePath}`} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <button className="btn btn-primary mt-5" onClick={handleCloseModal}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MEVideos;
