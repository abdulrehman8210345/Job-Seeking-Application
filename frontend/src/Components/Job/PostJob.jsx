// import React from 'react'

import { useContext, useState } from "react";
import { context } from "../../main";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const PostJob = () => {
  const [postjob, setPostjob] = useState({
    title: "",
    description: "",
    category: "",
    location: "",
    country: "",
    city: "",
    fixedSalary: "",
    salaryType: "default",
    salaryFrom: "",
    salaryTo: "",
  });
  const { isAuthorized, user } = useContext(context);
  const navigate = useNavigate();

  const handlePostJob = async (e) => {
    e.preventDefault();
    let payload;
    
    if (postjob.salaryType === "Fixed Salary") {
      payload = {
        title: postjob.title,
        city: postjob.city,
        country: postjob.country,
        category: postjob.category,
        location: postjob.location,
        description: postjob.description,
        fixedSalary: postjob.fixedSalary
      };
    } else if (postjob.salaryType === "Ranged Salary") {
      payload = {
        title: postjob.title,
        city: postjob.city,
        country: postjob.country,
        category: postjob.category,
        location: postjob.location,
        description: postjob.description,
        salaryFrom: postjob.salaryFrom,
        salaryTo: postjob.salaryTo
      };
    }
    await axios
      .post(
        "http://localhost:4000/api/v1/job/postjob",
        payload,
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      )
      .then((res) => {
        toast.success(res.data.message);
        setPostjob({
          title: "",
          description: "",
          category: "",
          location: "",
          country: "",
          city: "",
          fixedSalary: "",
          salaryType: "default",
          salaryFrom: "",
          salaryTo: "",
        });
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
    }
  

  const handleChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setPostjob({
      ...postjob,
      [name]: value,
    });
  };
  if (!isAuthorized || (user && user.role !== "Employer")) {
    navigate("/login");
  }
  return (
    <div className="job_post page">
      <div className="container">
        <h3>POST NEW JOB</h3>
        <form onSubmit={handlePostJob}>
          <div className="wrapper">
            <input
              type="text"
              value={postjob.title}
              name="title"
              onChange={handleChange}
              placeholder="Job Title"
            />
            <select
              value={postjob.category}
              name="category"
              onChange={handleChange}
            >
              <option value="">Select Category</option>
              <option value="MEVN Stack Development">
                MEVN STACK Development
              </option>
              <option value="Graphics & Design">Graphics & Design</option>
              <option value="Mobile App Development">
                Mobile App Development
              </option>
              <option value="Frontend Web Development">
                Frontend Web Development
              </option>
              <option value="MERN Stack Development">
                MERN STACK Development
              </option>
              <option value="Account & Finance">Account & Finance</option>
              <option value="Artificial Intelligence">
                Artificial Intelligence
              </option>
              <option value="Video Animation">Video Animation</option>
              <option value="MEAN Stack Development">
                MEAN STACK Development
              </option>
              <option value="Data Entry Operator">Data Entry Operator</option>
            </select>
          </div>
          <div className="wrapper">
            <input
              type="text"
              value={postjob.country}
              name="country"
              onChange={handleChange}
              placeholder="Your Country"
            />
            <input
              type="text"
              value={postjob.city}
              name="city"
              onChange={handleChange}
              placeholder="Your City"
            />
          </div>
          <input
            type="text"
            value={postjob.location}
            name="location"
            onChange={handleChange}
            placeholder="Location"
          />
          <div className="salary_wrapper">
            <select
              name="salaryType"
              onChange={handleChange}
              value={postjob.salaryType}
            >
              <option value="default">Select Salary Type</option>
              <option value="Fixed Salary">Fixed Salary</option>
              <option value="Ranged Salary">Ranged Salary</option>
            </select>
            <div>
              {postjob.salaryType === "default" ? (
                <p>Please Provide Salary type*</p>
              ) : postjob.salaryType === "Fixed Salary" ? (
                <input
                  type="number"
                  name="fixedSalary"
                  onChange={handleChange}
                  placeholder="Fixed Salary"
                />
              ) : (
                <div className="ranged_salary">
                  <input
                    type="number"
                    name="salaryFrom"
                    onChange={handleChange}
                    placeholder="Salary From"
                  />
                  <input
                    type="number"
                    name="salaryTo"
                    onChange={handleChange}
                    placeholder="Salary To"
                  />
                </div>
              )}
            </div>
          </div>
          <textarea rows={10} name="description" value={postjob.description} onChange={handleChange} placeholder="Job Description"/>
          <button type="submit">POST A JOB</button>
        </form>
      </div>
    </div>
  );
};

export default PostJob;
