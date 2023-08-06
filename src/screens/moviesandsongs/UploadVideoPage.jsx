import React, { useState } from 'react';
import { Typography, Button, Form, message, Input } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import Dropzone from 'react-dropzone';
import axios from 'axios';

const { Title } = Typography;
const { TextArea } = Input;
const { Option } = Select;

const Private = [
  { value: 0, label: 'Private' },
  { value: 1, label: 'Public' },
];

const Category = [
  { value: 0, label: 'Film & Animation' },
  { value: 1, label: 'Autos & Vehicles' },
  { value: 2, label: 'Music' },
  { value: 3, label: 'Pets & Animals' },
  { value: 4, label: 'Sports' },
];

const UploadVideoPage = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [privacy, setPrivacy] = useState(0);
  const [category, setCategory] = useState(0);
  const [file, setFile] = useState(null);

  const handleTitleChange = (e) => setTitle(e.target.value);
  const handleDescriptionChange = (e) => setDescription(e.target.value);
  const handlePrivacyChange = (value) => setPrivacy(value);
  const handleCategoryChange = (value) => setCategory(value);

  const onDrop = (acceptedFiles) => setFile(acceptedFiles[0]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      message.error('Please select a video file.');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);
    formData.append('title', title);
    formData.append('description', description);
    formData.append('privacy', privacy);
    formData.append('category', category);

    try {
      const res = await axios.post('/api/uploadVideo', formData);
      if (res.data.success) {
        message.success('Video uploaded successfully.');
      } else {
        message.error('Failed to upload the video.');
      }
    } catch (error) {
      message.error('An error occurred while uploading the video.');
    }
  };



  return (
    <div style={{ maxWidth: '700px', margin: '2rem auto' }}>
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <Title level={2} style={{ color: 'black' }}>Upload Video | Song</Title>
      </div>

      <Form onSubmit={onSubmit} className='shadow p-5'>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Dropzone
            onDrop={onDrop}
            multiple={false}
            maxSize={800000000}
          >
            {({ getRootProps, getInputProps }) => (
              <div
                style={{
                  width: '300px',
                  height: '240px',
                  border: '1px solid rgb(37, 141, 252)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                {...getRootProps()}
              >
                <input {...getInputProps()} />
                <PlusOutlined style={{ fontSize: '3rem', color: 'rgb(37, 141, 252)' }} />
              </div>
            )}
          </Dropzone>

          {thumbnail !== '' && (
            <div>
              <img width=" 320px" height="auto" src={`${thumbnail}`} alt="haha" />
            </div>
          )}
        </div>

        <br /><br />
        <label style={{ color: 'rgb(179, 179, 179)' }}>Title</label>
        <Input
          onChange={handleChangeTitle}
          value={title}
        />
        <br /><br />
        <label style={{ color: 'rgb(179, 179, 179)' }}>Description</label>
        <TextArea
          onChange={handleChangeDescription}
          value={description}
        />
        <br /><br />

        <label style={{ color: 'rgb(179, 179, 179)' }}>Privacy Level</label><br />
        <select style={{ position: 'center', top: '100%', left: '0', backgroundColor: 'white', borderRadius: '4px', boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)', padding: '10px' }} onChange={handleChangePrivacy}>
          {Private.map((item, index) => (
            <option key={index} value={item.value}>{item.label}</option>
          ))}
        </select>
        <br /><br />

        <label style={{ color: 'rgb(179, 179, 179)' }}>Category</label><br />
        <select style={{ position: 'center', top: '100%', left: '0', backgroundColor: 'white', borderRadius: '4px', boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)', padding: '10px' }} onChange={handleChangeCategories}>
          {Category.map((item, index) => (
            <option key={index} value={item.label}>{item.label}</option>
          ))}
        </select>
        <br /><br />

        <div style={{ display: 'flex', justifyContent: 'space-evenly', width: '50%', margin: 'auto' }}>
          <Button type="primary" size="large" onClick={onSubmit}>
            Submit
          </Button>
          <Button type="primary" className='bg-danger' size="large" onClick={goBack}>
            GoBack
          </Button>
        </div>
      </Form>
    </div>
  );
}

export default UploadVideoPage;
