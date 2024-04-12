// import React from 'react'

import { FaBuilding, FaSuitcase, FaUserPlus, FaUsers } from "react-icons/fa";

const HeroSection = () => {
  const details = [
    {
      id: 1,
      title: "2,23,990",
      subTitle: "Live Job",
      icon: <FaSuitcase />,
    },
    {
      id: 2,
      title: "87654",
      subTitle: "Companies",
      icon: <FaBuilding />,
    },
    {
      id: 3,
      title: "2,3480",
      subTitle: "Job Seekers",
      icon: <FaUsers />,
    },
    {
      id: 4,
      title: "1,0361",
      subTitle: "Employers",
      icon: <FaUserPlus />,
    },
  ];
  return (
    <div className="heroSection">
      <div className="container">
        <div className="title">
          <h1>Find a job that suits</h1>
          <h1>your interests and skills</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae
            modi nisi voluptates error fugit esse expedita dignissimos,
            assumenda iste, dolore architecto maiores ab ratione laboriosam
            molestias labore distinctio doloribus in!
          </p>
        </div>
        <div className="image">
          <img src="heroS.jpg" alt="Hero" />
        </div>
      </div>
      <div className="details">
        {details.map((ele) => {
          return (
            <div className="card" key={ele.id}>
              <div className="icon">{ele.icon}</div>
              <div className="content">
                <p>{ele.title}</p>
                <p>{ele.subTitle}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default HeroSection;
