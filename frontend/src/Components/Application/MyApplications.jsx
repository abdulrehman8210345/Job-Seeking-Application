// import React from 'react'

import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { context } from "../../main";
import axios from "axios";
import toast from "react-hot-toast";
import ResumeModel from "./ResumeModel";

const MyApplications = () => {
  const navigateTo = useNavigate();
  const [applications, setApplications] = useState([]);
  const [modelOpen, setModelOpen] = useState(false);
  const [imageURL, setImageURL] = useState("");
  const { isAuthorized, user } = useContext(context);

  useEffect(() => {
    try {
      if (user && user.role === "Employer") {
        axios
          .get("http://localhost:4000/api/v1/applications//employer/getall", {
            withCredentials: true,
          })
          .then((res) => {
            setApplications(res.data.allapplications);
          });
      } else {
        axios
          .get("http://localhost:4000/api/v1/applications//jobseeker/getall", {
            withCredentials: true,
          })
          .then((res) => {
            setApplications(res.data.allapplications);
          });
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }, [isAuthorized]);

  if (!isAuthorized) {
    navigateTo("/login");
  }

  const deleteApplication = async (id) => {
    try {
     await axios
        .delete(`http://localhost:4000/api/v1/applications/delete/${id}`, {
          withCredentials: true,
        })
        .then((res) => {
          toast.success(res.data.message);
          setApplications(applications.filter((app) => app._id !== id));
        });
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  const openModel = (imgUrl) => {
    setImageURL(imgUrl);
    setModelOpen(true);
  };
  const closeModel = () => {
    setModelOpen(false);
  };
  return (
    <section className="my_applications page">
      {user && user.role === "Job Seeker" ? (
        <div className="container">
          <h3>My Applications</h3>
          {applications.map((ele) => {
            return (
              <JobSeekerCard
                ele={ele}
                key={ele._id}
                deleteApplication={deleteApplication}
                openModel={openModel}
              />
            );
          })}
        </div>
      ) : (
        <div className="container">
          <h3>Applications from Job Seeker</h3>
          {applications.map((ele) => {
            return (
              <EmployerCard ele={ele} key={ele._id} openModel={openModel} />
            );
          })}
        </div>
      )}
      {modelOpen && <ResumeModel imageURL={imageURL} onClose={closeModel} />}
    </section>
  );
};

export default MyApplications;

const JobSeekerCard = ({ ele, deleteApplication, openModel }) => {
  return (
    <div className="job_seeker_card">
      <div className="detail">
        <p>
          <span>Name:</span>
          {ele.name}
        </p>
        <p>
          <span>Email:</span>
          {ele.email}
        </p>
        <p>
          <span>Phone:</span>
          {ele.phone}
        </p>
        <p>
          <span>Address:</span>
          {ele.address}
        </p>
        <p>
          <span>Cover Letter:</span>
          {ele.coverLetter}
        </p>
      </div>
      <div className="resume">
        <img
          src={ele.resume.url}
          alt="Resume"
          onClick={() => openModel(ele.resume.url)}
        />
      </div>
      <div className="btn_area">
        <button onClick={() => deleteApplication(ele._id)}>
          Delete Application
        </button>
      </div>
    </div>
  );
};

const EmployerCard = ({ ele, openModel }) => {
  return <div className="job_seeker_card">
  <div className="detail">
    <p>
      <span>Name:</span>
      {ele.name}
    </p>
    <p>
      <span>Email:</span>
      {ele.email}
    </p>
    <p>
      <span>Phone:</span>
      {ele.phone}
    </p>
    <p>
      <span>Address:</span>
      {ele.address}
    </p>
    <p>
      <span>Cover Letter:</span>
      {ele.coverLetter}
    </p>
  </div>
  <div className="resume">
    <img
      src={ele.resume.url}
      alt="Resume"
      onClick={() => openModel(ele.resume.url)}
    />
  </div>
</div>;
};
