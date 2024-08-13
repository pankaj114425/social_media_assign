import React, { useState } from "react";
import "./share.css";
import axios from "axios";
import { MdCancel } from "react-icons/md";
import { toast } from "react-toastify";
import { useAuth } from "../../context/authcontext";
const Share = () => {
    const {profilePic,username,isAuthenticated}=useAuth()
  //   const [image, setImage] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);

  //   const handleImageChange = (e) => {
  //     setImage(URL.createObjectURL(e.target.files[0]));
  //   };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleShare = async (e) => {
    e.preventDefault();
    if (!title || !description || !file) {
      toast.error("Please fill in all fields and upload an image");
      return;
    }
    const newPost = {
      // userId: user;
      desc: description,
      title: title,
      username:username,
      userPic:profilePic
    };
    if (file) {
      const data = new FormData();
      const fileName = Date.now() + file.name;
      data.append("name", fileName);
      data.append("file", file);
      newPost.img = fileName;
      try {
        await axios.post("/api/upload", data);
      } catch (error) {
        console.log(error);
      }
      try {
        const response = await fetch('/api/post/', {
          method: 'POST',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newPost),
      });
        // const dataapi = await axios.post("/api/post/", newPost);
        // console.log('dat is sdjsj skjdsk d')
        // console.log(dataapi)
        // const res = dataapi.data;
        const res= await response.json();
        
        if (res.success) {
          toast.success(res.message);
          setTitle("");
          setDescription("");
          setFile(null);
          window.location.reload();
        } else {
          toast.error(res.message);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className="share-container">
      <h2>Share Your Post</h2>
      <form className="share-form">
        <div className="form-group">
          <label htmlFor="image-upload">Upload Image:</label>
          <input
            type="file"
            id="file"
            name="file"
            accept="image/*"
            onChange={(e) => setFile(e.target.files[0])}
            required
          />
          {file && (
            <div className="shareImgContainer">
              <img
                src={URL.createObjectURL(file)}
                alt="Preview"
                className="image-preview"
              />
              <MdCancel
                className="cancelbutton"
                onClick={() => {
                  setFile(null);
                }}
              />
            </div>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={handleTitleChange}
            placeholder="Enter title"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            value={description}
            onChange={handleDescriptionChange}
            placeholder="Enter description"
            required
          />
        </div>
        <button type="button" onClick={handleShare} className="share-button">
          Share
        </button>
      </form>
    </div>
  );
};

export default Share;
