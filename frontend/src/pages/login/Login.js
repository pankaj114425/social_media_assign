import React, { useState } from "react";
import "./login.css";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../../context/authcontext";
const Login = () => {
  const { setIsAuthenticated,setUsername,setProfilePic}=useAuth()
   const navigate=useNavigate();
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleClick = async(e) => {
    e.preventDefault();
    const dataResponse = await fetch("api/user/login", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const dataApi = await dataResponse.json();
    if (dataApi.success) {
      setIsAuthenticated(true)
      localStorage.setItem("profilePic", dataApi.data.profilePic);
      localStorage.setItem("username", dataApi.data.username);
      // setProfilePic(dataApi.data.profilePic)
      // setUsername(dataApi.data.username)
       navigate('/')
      toast.success(dataApi.message);
      window.location.reload()
      // navigate('/login')
    } else {
      toast.error(dataApi.message);
    }
  };
  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginRight">
          <form className="loginBox" onSubmit={handleClick}>
            <input
              placeholder="Enter Email"
              required
              className="loginInput"
              type="email"
              name="email"
              value={data.email}
              onChange={handleOnChange}
            />
            <input
              placeholder="Enter Password"
              required
              className="loginInput"
              type="password"
              name="password"
              value={data.password}
              min="6"
              onChange={handleOnChange}
            />

            <button className="loginButton" type="sumbit">
              Sign In
            </button>
            <button className="loginRegisterButton"> <Link to={'/register'} style={{textDecoration:'none'}}>SignUp into Account</Link></button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
