import './Display.css';
import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Spinner from './Spinner';

const Display = ({ isLoggedIn }) => {
  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/login');
    } else {
      fetchImages();
    }
  }, [isLoggedIn]);

  const fetchImages = async () => {
    try {
      const res = await axios.get('http://localhost:8080/api/images', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });

      if (res.status === 200) {
        setImages(res.data);
      } else {
        console.error('Failed to fetch images');
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleImageUpload = async () => {
    setIsLoading(true);  // Set loading to true when the upload starts
    const formData = new FormData();
    formData.append('image', selectedImage);

    try {
      const res = await axios.post('http://localhost:8080/api/images/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (res.status === 200) {
        fetchImages();
        setSelectedImage(null);
      } else {
        console.error('Image upload failed');
      }
    } catch (err) {
      console.error(err);
    }
    setIsLoading(false);  // Set loading to false when the upload ends
  };
  const handleImageDelete = async (id) => {
    setIsLoading(true);  // Set loading to true when the deletion starts
    try {
      const res = await axios.delete(`http://localhost:8080/api/images/delete/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
  
      if (res.status === 200) {
        fetchImages();
      } else {
        console.error('Image deletion failed');
      }
    } catch (err) {
      console.error(err);
    }
    setIsLoading(false);  // Set loading to false when the deletion ends
  };
  

  return (
    <div className="displayDiv">
      <h1 className="displayTitle">User's Images</h1>
      <input type="file" onChange={(e) => setSelectedImage(e.target.files[0])} className="displayInput" />
      <button onClick={handleImageUpload} className="displayButton">Upload Image</button>
      {isLoading && <Spinner />} 
      <div className="imageContainer">
        {images.map((image) => (
          <div key={image._id} className="imageCard">
            <img src={image.imageUrl} alt="User upload" className="displayImage" />
            <button onClick={() => handleImageDelete(image._id)} className="deleteButton">Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Display;
