import React, { useEffect, useRef, useState } from "react";
import "./feed.css";
import axios from "axios";
import Post from "../post/Post";
import EditForm from "../editForm/EditForm";
import { toast } from "react-toastify";
const Feed = () => {
  const [posts, setPosts] = useState([]);
  const [postToEdit, setPostToEdit] = useState(null);
  const editFormRef = useRef(null);
  useEffect(() => {
    const fetchPosts = async () => {
      const res = await axios.get("/api/post/allposts");
      setPosts(res?.data?.sort((p1,p2)=>{
        return new Date(p2.createdAt)- new Date(p1.createdAt)
      }));
    };
    fetchPosts();
},[]);
  const handleEdit=(post)=>{
    setPostToEdit(post);
    setTimeout(() => {
      editFormRef.current.scrollIntoView({ behavior: "smooth" });
    }, 100);
  }

  const handleDelete = async (postId) => {
    try {
      const response = await fetch(`/api/post/${postId}`, {
        method: 'DELETE',
        credentials: 'include', // Include credentials if needed (e.g., cookies)
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      const data = await response.json();
      if(data.success){
        setPosts(posts.filter(post => post._id !== postId));
        toast.success(data.message)
      }
      else{
        toast.error(data.message)
      }
    } catch (error) {
      console.error("There was an error deleting the post!", error);
    }
  };
  return (
    <div className="feed">
      <div className="feedWrapper">
         {posts.map((p)=>(
          <Post key={p._id} post={p} onEdit={handleEdit} onDelete={handleDelete}/>
         ))}
      </div>
      {postToEdit && (
        <div ref={editFormRef}>
    <EditForm post={postToEdit} onClose={() => setPostToEdit(null)} />
        </div>
       
      )}
    </div>
  );
};

export default Feed;
