// import React from 'react'

import { useContext, useState } from "react";
import { context } from "../../main";
import axios from "axios";
import toast from "react-hot-toast";
import { Link, Navigate } from "react-router-dom";
import {  FaRegUser } from "react-icons/fa";
import {MdOutlineMailOutline} from "react-icons/md"
import { RiLock2Fill } from "react-icons/ri";

const Login = () => {
  const [login, setLogin] = useState({
    email: "",
    password: "",
    role: "",
  });

  const { isAuthorized, setIsAuthorized } = useContext(context);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:4000/api/v1/user/login",
        login,
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );
      toast.success(data.message);
      setLogin({
        email: "",
        password: "",
        role: "",
      });
      setIsAuthorized(true);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const handleChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setLogin({
      ...login,
      [name]: value,
    });
  };
  if (isAuthorized) {
    return <Navigate to={"/"} />;
  }
  return (
    <div className="authPage">
      <div className="container">
        <div className="header">
          <img src="JobZeelogo.png" alt="Logo" />
          <h4>Login to your account</h4>
        </div>
        <form>
          <div className="inputTag">
            <label>Role</label>
            <div>
              <select name="role" value={login.role} onChange={handleChange}>
                <option value="">Your role</option>
                <option value="Employer">Employer</option>
                <option value="Job Seeker">Job Seeker</option>
              </select>
              <FaRegUser />
            </div>
          </div>
          <div className="inputTag">
            <label>Email</label>
            <div>
              <input
                type="email" name="email"
                value={login.email}
                onChange={handleChange}
                placeholder="Email Address"
              />
              <MdOutlineMailOutline/>
            </div>
          </div>
          <div className="inputTag">
            <label>Password</label>
            <div>
              <input
                type="password" name="password"
                value={login.password}
                onChange={handleChange}
                placeholder="Password"
              />
              <RiLock2Fill/>
            </div>
          </div>
          <button onClick={handleLogin} type="submit">Login</button>
          <Link to={"/register"}>Register Now</Link>
        </form>
      </div>
      <div className="banner">
        <img src="/login.png" alt="Login" />
      </div>
    </div>
  );
};

export default Login;
