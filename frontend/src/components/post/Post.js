import React, { useState } from 'react'
import './post.css'
import {format} from "timeago.js"
import { MdMoreVert } from "react-icons/md";
const Post = ({post,onEdit,onDelete}) => {
  
  const PF='http://localhost:8080/images/'

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  

  const handleMoreVertClick = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleEdit = () => {
      onEdit(post);
    setIsDropdownOpen(false);
  };

  const handleDelete = () => {
    onDelete(post._id);
    setIsDropdownOpen(false);
  };
  return (
    <div className='post'>
        <div className="postWrapper">
         <div className="postTop">
            <div className="postTopLeft">
           
            
              <img  className='postProfileImg'  src={ post.userPic ||'/avatr.jpeg'  }alt=""  />
        
        
             
              <span className="postUsername"> {post.username} </span>
             
              
               <span className="postDate">{format(post.createdAt)}</span> 
            </div>
            <div className='postTopRight'>
            <MdMoreVert onClick={handleMoreVertClick} />
            {isDropdownOpen && (
              <div className='dropdownMenu'>
                <span className='dropdownItem' onClick={handleEdit}>    
                  Edit
                </span>
                <span className='dropdownItem'  onClick={handleDelete}  >
                 
                  Delete
                </span>
              </div>
            )}
          </div>
        </div>
        
         <div className="postCenter">
            <img className='postImg' src={PF+post.img} alt=""  />
         </div>
         <div className="postBottom">
         <span className="postText"> Title: {post.title}</span>
         <span className="postText">DESC: {post.desc}</span>
             
         </div>
         
        </div>
    </div>
   
  )
}

export default Post
