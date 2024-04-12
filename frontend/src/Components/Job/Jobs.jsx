// import React from 'react'

import { useContext, useEffect, useState } from "react"
import { context } from "../../main"
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Jobs = () => {
  const [jobs, setJobs] = useState([])
  const {isAuthorized} = useContext(context);
  const navigateto=useNavigate();

  useEffect(() => {
   axios.get("http://localhost:4000/api/v1/job/getjobs",{ withCredentials: true }).then((res)=>{
    setJobs(res.data.alljobs);
  
   })
  }, []);

  if(!isAuthorized){
    navigateto("/login");
  }
  
  return (
    <div className="jobs page">
      <div className="container">
        <h3>ALL AVAILABLE JOBS</h3>
        <div className="banner">
          {
            jobs && jobs.map((job)=>{
              return (
                <div className="card" key={job._id}>
                  <p>{job.title}</p>
                  <p>{job.category}</p>
                  <p>{job.location}</p>
                  <Link to={`/job/${job._id}`}>Job Details</Link>
                </div>
              )
            })
          }
        </div>
      </div>
    </div>
  )
}

export default Jobs