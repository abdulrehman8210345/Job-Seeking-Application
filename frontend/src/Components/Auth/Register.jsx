// import React from 'react'

import { useContext, useState } from "react";
import { context } from "../../main";
import axios from "axios";
import toast from "react-hot-toast";
import { Link, Navigate } from "react-router-dom";
import { FaPencilAlt, FaRegUser } from "react-icons/fa";
import {MdOutlineMailOutline} from "react-icons/md"
import {FaPhoneFlip} from "react-icons/fa6"
import { RiLock2Fill } from "react-icons/ri";

const Register = () => {
  const [register, setRegister] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    role: "",
  });

  const { isAuthorized, setIsAuthorized } = useContext(context);

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:4000/api/v1/user/register",
        register,
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );
      toast.success(data.message);
      setRegister({
        name: "",
        email: "",
        password: "",
        phone: "",
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
    setRegister({
      ...register,
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
          <h4>Create a new account</h4>
        </div>
        <form>
          <div className="inputTag">
            <label>Role</label>
            <div>
              <select name="role" value={register.role} onChange={handleChange}>
                <option value="">Your role</option>
                <option value="Employer">Employer</option>
                <option value="Job Seeker">Job Seeker</option>
              </select>
              <FaRegUser />
            </div>
          </div>
          <div className="inputTag">
            <label>Name</label>
            <div>
              <input
                type="text" name="name"
                value={register.name}
                onChange={handleChange}
                placeholder="Name"
              />
              <FaPencilAlt />
            </div>
          </div>
          <div className="inputTag">
            <label>Email</label>
            <div>
              <input
                type="email" name="email"
                value={register.email}
                onChange={handleChange}
                placeholder="Email Address"
              />
              <MdOutlineMailOutline/>
            </div>
          </div>
          <div className="inputTag">
            <label>Phone</label>
            <div>
              <input
                type="number" name="phone"
                value={register.phone}
                onChange={handleChange}
                placeholder="Phone"
              />
              <FaPhoneFlip/>
            </div>
          </div>
          <div className="inputTag">
            <label>Password</label>
            <div>
              <input
                type="password" name="password"
                value={register.password}
                onChange={handleChange}
                placeholder="Password"
              />
              <RiLock2Fill/>
            </div>
          </div>
          <button onClick={handleRegister} type="submit">Register</button>
          <Link to={"/login"}>Login</Link>
        </form>
      </div>
      <div className="banner">
        <img src="/register.png" alt="Register" />
      </div>
    </div>
  );
};

export default Register;
