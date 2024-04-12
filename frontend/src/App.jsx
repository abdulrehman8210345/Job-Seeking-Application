import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Components/Auth/Login";
import Register from "./Components/Auth/Register";
import Home from "./Components/Home/Home";
import Footer from "./Components/Layout/Footer";
import { Toaster } from "react-hot-toast";
import Navbar from "./Components/Layout/Navbar";
import Jobs from "./Components/Job/Jobs";
import MyJobs from "./Components/Job/MyJobs";
import JobDetails from "./Components/Job/JobDetails";
import PostJob from "./Components/Job/PostJob";
import NotFound from "./Components/NotFound/NotFound";
import Application from "./Components/Application/Application";
import MyApplication from "./Components/Application/MyApplications";
import { context } from "./main";
import { useContext, useEffect } from "react";
import axios from "axios";
import "./App.css";

const App = () => {
  const { isAuthorized, setIsAuthorized, setUser } = useContext(context);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4000/api/v1/user/getuser",
          { withCredentials: true }
        );
        setUser(response.data.user);
        setIsAuthorized(true);
      } catch (error) {
        setIsAuthorized(false);
      }
    };
    fetchUser();
  }, [isAuthorized]);

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Home />} />
        <Route path="/job/getall" element={<Jobs />} />
        <Route path="/job/me" element={<MyJobs />} />
        <Route path="/job/:id" element={<JobDetails />} />
        <Route path="/job/post" element={<PostJob />} />
        <Route path="/application/:id" element={<Application />} />
        <Route path="/application/me" element={<MyApplication />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
      <Toaster />
    </Router>
  );
};

export default App;
