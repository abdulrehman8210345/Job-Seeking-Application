// import React from 'react'

import { useContext } from "react"
import { context } from "../../main"
import { Navigate } from "react-router-dom";
import HeroSection  from "./HeroSection"
import HowItWorks from "./HowItWorks";
import PopularCategories from "./PopularCategories";
import PopularCompanies from "./PopularCompanies";

const Home = () => {
  const {isAuthorized} = useContext(context);
  if(!isAuthorized){
    return <Navigate to="/login"/>
  }
  return (
    <section className="page homePage">
      <HeroSection/>
      <HowItWorks/>
      <PopularCategories/>
      <PopularCompanies/>
    </section>
  )
}

export default Home