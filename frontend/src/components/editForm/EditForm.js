import React, { useState } from 'react';
import axios from 'axios';
import './editForm.css';
import { MdCancel } from 'react-icons/md';
import { toast } from 'react-toastify';

const EditForm = ({ post, onClose }) => {
  const [title, setTitle] = useState(post.title);
  const [description, setDescription] = useState(post.desc);
  const [file, setFile] = useState(null);
  const PF='http://localhost:8080/images/';
  const handleImageChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSave = async () => {
    const updatedPost = {
      title,
      desc: description,
    };

    if (file) {
      const data = new FormData();
      const fileName = Date.now() + file.name;
      data.append("name", fileName);
      data.append("file", file);
      updatedPost.img = fileName;
      try {
        await axios.post("/api/upload", data);
      } catch (error) {
        console.log(error);
      }
    }

    try {
        const response = await fetch(`/api/post/${post._id}`, {
            method: 'PATCH',
            credentials: 'include',
            headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(updatedPost),
        });
        const res=await response.json()
        
        if(res.success){
            toast.success(res.message)
            onClose(); 
            window.location.reload()
        }
        else{
            toast.error(res.message);
        }
        
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="editForm">
      <h2>Edit Post</h2>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Enter title"
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Enter description"
      />
      <div className="imagePreview">
        <img src={file ? URL.createObjectURL(file) : PF+post.img} alt="Post" />
        {/* {file && <MdCancel
                className="cancelbutton"
                onClick={() => {
                  setFile(null);
                }}
              />} */}
      </div>
       
      <input type="file" onChange={handleImageChange} />
      <div className='buttons'>
      <button onClick={onClose}>Cancel</button>
      <button onClick={handleSave}>Save</button>
      
      </div>
    </div>
  );
};

export default EditForm;
