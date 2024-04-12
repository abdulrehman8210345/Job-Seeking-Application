// import React from 'react'

import { FaUserPlus } from "react-icons/fa"
import { MdFindInPage } from "react-icons/md"
import { IoMdSend } from "react-icons/io";


const HowItWorks = () => {
  return (
    <div className="howitworks">
      <div className="container">
        <h1>How JobZee works</h1>
        <div className="banner">
          <div className="card">
            <FaUserPlus/>
            <p>Create account</p>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit qui delectus nihil a magnam exercitationem recusandae rerum. Deserunt, sint quas?</p>
          </div>
          <div className="card">
            <MdFindInPage/>
            <p>Find a job/Post a job</p>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit qui delectus nihil a magnam exercitationem recusandae rerum. Deserunt, sint quas?</p>
          </div>
          <div className="card">
            <IoMdSend/>
            <p>Apply for job/recruit suitable candidates</p>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit qui delectus nihil a magnam exercitationem recusandae rerum. Deserunt, sint quas?</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HowItWorks