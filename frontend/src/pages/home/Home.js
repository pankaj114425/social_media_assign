import React from "react";
import "./home.css";
import Share from "../../components/share/Share";
import Feed from "../../components/feed/Feed";
import Post from "../../components/post/Post";

const Home = () => {
  return (
    <>
      <div className="share">
      <Share />
      
      </div>
      <Feed />
      
      
      
      
    </>
  );
};

export default Home;
