// import React from 'react'

import { useContext } from "react"
import { context } from "../../main"
import {FaFacebookF,FaLinkedin,FaYoutube} from "react-icons/fa"
import {RiInstagramFill} from "react-icons/ri"
import { Link } from "react-router-dom"

const Footer = () => {
    const {isAuthorized} = useContext(context);
  return (
    <footer className={isAuthorized ? "footerShow" : "footerHide"} >
        <div>&copy; All Rights Reserved by Abdul Rehman</div>
        <div>
            <Link to={"https://www.facebook.com/"} target={"_blank"}> <FaFacebookF/></Link>
            <Link to={"https://www.linkedin.com/"} target={"_blank"}> <FaLinkedin/></Link>
            <Link to={"https://www.youtube.com/"} target={"_blank"}> <FaYoutube/></Link>
            <Link to={"https://www.instagram.com/"} target={"_blank"}> <RiInstagramFill/></Link>
        </div>
    </footer>
  )
}

export default Footer