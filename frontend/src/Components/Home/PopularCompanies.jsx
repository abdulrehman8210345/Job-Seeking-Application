// import React from 'react'

import { FaApple, FaMicrosoft } from "react-icons/fa";
import { SiTesla  } from "react-icons/si";

const PopularCompanies = () => {
  const companies = [
    {
      id: 1,
      title: "Microsoft",
      location: "Street 10 Karachi, Pakistan",
      openPositions: 10,
      icon: <FaMicrosoft />,
    },
    {
      id: 2,
      title: "Tesla",
      location: "Street 10 Karachi, Pakistan",
      openPositions: 5,
      icon: <SiTesla />,
    },
    {
      id: 3,
      title: "Apple",
      location: "Street 10 Karachi, Pakistan",
      openPositions: 20,
      icon: <FaApple />,
    },
  ];

  return (
    <div className="companies">
      <div className="container">
        <h3>TOP COMPANIES</h3>
      <div className="banner">
        {
          companies.map(comp=>{
            return(
              <div className="card" key={comp.id}>
                <div className="content">
                  <div className="icon">{comp.icon}</div>
                  <div className="text">
                    <p>{comp.title}</p>
                    <p>{comp.location}</p>
                  </div>
                </div>
                <button>Open Positions {comp.openPositions}</button>
              </div>
            )
          })
        }
      </div>
      </div>
    </div>
  )
}

export default PopularCompanies