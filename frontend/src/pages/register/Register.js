// import React, { useState,useNavigate } from "react";
// import "./register.css";
// import imageToBase64 from "../../helper/imagebase64";
// import { toast } from "react-toastify";
// const Register = () => {
//   // const navigate =useNavigate()
//   const [data, setData] = useState({
//     username: "",
//     email: "",
//     password: "",
//     profilePic: "",
//   });
//   const [ConfirmPassword,setConfirmPassword]=useState('')
//   const handleOnChange = (e) => {
//     const { name, value } = e?.target;
//     setData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };
//   const handleUploadPic = async (e) => {
//     const file = e.target.files[0];
//     const imagePic = await imageToBase64(file);
//     setData((prev) => ({
//       ...prev,
//       profilePic: imagePic,
//     }));
//   };
  

//   const handleSumbit = async(e) => {
//     e.preventDefault();
//     if(data.password === ConfirmPassword){

//       const dataResponse = await fetch('api/user/register',{
//           method : 'Post',
//           headers : {
//               "content-type" : "application/json"
//           },
//           body : JSON.stringify(data)
//         })
//     console.log(dataResponse)
//         const dataApi = await dataResponse.json()
//          if(dataApi.success){
//           toast.success(dataApi.message);
//           // navigate('/login')
//          }
//          else{
//           toast.error(dataApi.message)
//          }

         
       
//       }else{
//         toast.error("Please check password and confirm password")
//       }
//   };
//   return (
//     <div className="login">
//       <div className="loginWrapper">
        
        
//         <div className="loginRight">
//         <div class="profile-container">
//           <div class="profile-pic">
//             <img src={data?.profilePic || '/avatr.jpeg'} alt="login icon" />
//           </div>
          
//           <form  className="profile_form" >
//             <label>
//               <div class="upload-button">Upload pic</div>
//               <input
//                 type="file"
//                 class="hidden-input"
//                 onChange= {handleUploadPic}
//               />
//             </label>
//           </form>
          
//         </div>
//           <form className="loginBox" onSubmit={handleSumbit}>
//             <input
//               type="text"
//               placeholder="Enter Username"
//               required
//               className="loginInput"
//               name="username"
//               value={data.username}
//               onChange={handleOnChange}
//             />
//             <input
//               placeholder="Enter Email"
//               required
//               className="loginInput"
//               type="email"
//               name="email"
//               value={data.email}
//               onChange={handleOnChange}
//             />
//             <input
//               placeholder="Enter Password"
//               required
//               className="loginInput"
//               type="password"
//               name="password"
//               value={data.password}
//               min="4"
//               onChange={handleOnChange}
//             />
//             <input
//               placeholder="Confirm Password "
//               required
//               className="loginInput"
//               type="password"
//               name="ConfirmPassword"
//               value={data.ConfirmPassword}
//               onChange={(e) => setConfirmPassword(e.target.value)}

//             />
//             <button className="loginButton" type="sumbit">
//               Sign Up
//             </button>
//             <button className="loginRegisterButton">Log into Account</button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Register;

import React, { useState } from "react";
import "./register.css";
import imageToBase64 from "../../helper/imagebase64";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const navigate=useNavigate();
  const [data, setData] = useState({
    username: "",
    email: "",
    password: "",
    profilePic: "",
  });
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUploadPic = async (e) => {
    const file = e.target.files[0];
    const imagePic = await imageToBase64(file);
    setData((prev) => ({
      ...prev,
      profilePic: imagePic,
    }));
  };

  const handleSumbit = async (e) => {
    e.preventDefault();
    if (data.password === confirmPassword) {
      const dataResponse = await fetch("api/user/register", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const dataApi = await dataResponse.json();
      if (dataApi.success) {
        toast.success(dataApi.message);
        navigate('/login')
      } else {
        toast.error(dataApi.message);
      }
    } else {
      toast.error("Please check password and confirm password");
    }
  };

  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginRight">
          <div className="profile-container">
            <div className="profile-pic">
              <img
                src={data?.profilePic || "/avatr.jpeg"}
                alt="profile pic"
              />
            </div>

         { !data.profilePic &&  (<form className="profile_form">
              <label>
                <div className="upload-button">Upload pic</div>
                <input
                  type="file"
                  className="hidden-input"
                  onChange={handleUploadPic}
                />
              </label>
            </form>)
    }
          </div>
          <form className="loginBox" onSubmit={handleSumbit}>
            <input
              type="text"
              placeholder="Enter Username"
              required
              className="loginInput"
              style={{marginTop:'20px',width:'95%',borderRadius: '10px',height:'40px'}}
              name="username"
              value={data.username}
              onChange={handleOnChange}
            />
            <input
              placeholder="Enter Email"
              required
              className="loginInput"
              type="email"
              name="email"
              value={data.email}
              onChange={handleOnChange}
            />
            <div className="password-container">
              <input
                placeholder="Enter Password"
                required
                className="InputPass"
                type={passwordVisible ? "text" : "password"}
                name="password"
                value={data.password}
                onChange={handleOnChange}
              />
              <FontAwesomeIcon
                icon={passwordVisible ? faEye : faEyeSlash}
                className="eye-icon"
                onClick={() => setPasswordVisible(!passwordVisible)}
              />
            </div>
            <div className="password-container">
              <input
                placeholder="Confirm Password "
                required
                className="InputPass"
                type={confirmPasswordVisible ? "text" : "password"}
                name="ConfirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <FontAwesomeIcon
                icon={confirmPasswordVisible ? faEye : faEyeSlash}
                className="eye-icon"
                onClick={() =>
                  setConfirmPasswordVisible(!confirmPasswordVisible)
                }
              />
            </div>
            <button className="loginButton" type="submit">
              Sign Up
            </button>
            <button className="loginRegisterButton"> <Link to={'/login'} style={{textDecoration:'none'}}>Log into Account</Link></button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
