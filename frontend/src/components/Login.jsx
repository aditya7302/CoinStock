import React, { useState } from "react";
import "./styles/Login.css";
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [activeTab, setActiveTab] = useState("signup");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle form submission here, e.g., send data to the server
    if(activeTab==="signup"){
      try{
    const response = await fetch('http://localhost:8000/api/signup',{
      method:'POST',
      credentials: 'include',
      headers:{
        'Content-Type':'application/json'
      },
      body: JSON.stringify(formData)
    });
    const data= await response.json();
    if(data === 200){
      alert("you are signed up, please login.")
    }
    else if(data===404){
      alert('there is already one account registered with your email ');
    }
      else{
      alert("failed to signup");
    }
    console.log(data);
  }catch(error){
    console.log("there is an error" , error);
  }
  }else{
    try{
      const loginData = {
        email: formData.email,
        password: formData.password
      }

      const response = await fetch('http://localhost:8000/api/login',{
        method:'POST',
        credentials: 'include',
        headers:{
          'Content-Type':'application/json'
        },
        body: JSON.stringify(loginData)
      });
      const data = await response.json();
      console.log(data);
      if(data===404){
        alert('you are already logged in. if you want to log in with another account log out first.')
      }
      else if(data===303){
        alert('cant find the user please signup first.');
        navigate("/login");
      }
      else if (data===505){
        alert('incorrect password');
      }
      else{
        alert('login successful');
        navigate("/cryptocurrency");
      }
    }catch(error){
      console.log("the error is ", error);
    }
  }
  };

  return (
    <div className="login">
      <div className="form">
        <ul className="tab-group">
          <li className={activeTab === "signup" ? "tab active" : "tab"} onClick={()=>handleTabChange("signup")}><a href="#signup" className="tab-links">Sign Up</a></li>
          <li className={activeTab === "login" ? "tab active" : "tab"} onClick={()=>handleTabChange("login")}><a href="#login" className="tab-links">Login</a></li>
        </ul>
        <div className="tab-content">
          <div id="signup" style={{ display: activeTab === "signup" ? "block" : "none" }}>
            <h1 className="form-heading">Sign Up for Free</h1>
            <form onSubmit={handleSubmit}>
              <div className="top-row">
              <div className="field-wrap">
                  {/* <label>
                    First Name<span className="req">*</span>
                  </label> */}
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                    placeholder="First Name*"
                    className="input"
                  />
                </div>

                <div className="field-wrap">
                  {/* <label>
                    Last Name<span className="req">*</span>
                  </label> */}
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                    placeholder="Last Name*"
                    className="input"
                  />
                </div>               
              </div>
              <div className="field-wrap">
                {/* <label>
                  Email Address<span className="req">*</span>
                </label> */}
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="Email Address*"
                  className="input"
                />
              </div>

              <div className="field-wrap">
                {/* <label>
                  Set A Password<span className="req">*</span>
                </label> */}
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  placeholder="Set A Password*"
                  className="input"
                />
              </div>
              <button type="submit" className="user-button button-block">
                Get Started
              </button>
            </form>
          </div>

          <div
            id="login"
            style={{ display: activeTab === "login" ? "block" : "none" }}
          >
            <h1 className="form-heading">Welcome Back!</h1>
            <form onSubmit={handleSubmit}>
              <div className="field-wrap">
                {/* <label>
                  Email Address<span className="req">*</span>
                </label> */}
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="Email Address*"
                  className="input"
                />
              </div>

              <div className="field-wrap">
                {/* <label>
                  Password<span className="req">*</span>
                </label> */}
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  placeholder="Password*"
                  className="input"
                />
              </div>

              <button type="submit" className="user-button button-block">
                Log In
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
