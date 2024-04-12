// import React from 'react'

import { useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { context } from "../../main";
import axios from "axios";
import toast from "react-hot-toast";

const Application = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    resume: null,
    coverLetter: "",
    address: "",
  });
  const navigateTo = useNavigate();
  const { isAuthorized, user } = useContext(context);

  const handleFileChange = (e) => {
    const { name } = e.target;
    if (name === "resume") {
      setForm({
        ...form,
        [name]: e.target.files[0], // Update resume field
      });
    }
  };
  const { id } = useParams();
  const handleApplication = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("email", form.email);
    formData.append("phone", form.phone);
    formData.append("coverLetter", form.coverLetter);
    formData.append("address", form.address);
    formData.append("resume", form.resume);
    formData.append("jobID", id);

    const { data } = await axios
      .post(
        "http://localhost:4000/api/v1/applications/postapplication",
        formData,
        {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        }
      )
      .then((res) => {
        setForm({
          name: "",
          email: "",
          phone: "",
          resume: null,
          coverLetter: "",
          address: "",
        });
        toast.success(res.data.message);
        navigateTo("/job/getall");
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  };

  const handleChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    if (name === 'phone') {
      value = value ? parseInt(value) : ''; 
    }
    setForm({
      ...form,
      [name]: value,
    });
  };

  if (!isAuthorized || (user && user.role === "Employer")) {
    navigateTo("/");
  }
  return (
    <section className="application">
      <div className="container">
        <h3>Application Form</h3>
        <form onSubmit={handleApplication}>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Name"
          />
          <input
            type="text"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Email"
          />
          <input
            type="number"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            placeholder="Phone"
          />
          <input
            type="text"
            name="address"
            value={form.address}
            onChange={handleChange}
            placeholder="Address"
          />
          <textarea
            name="coverLetter"
            value={form.coverLetter}
            onChange={handleChange}
            placeholder="Cover Letter"
          />
          <div>
            <label
              style={{
                textAlign: "start",
                display: "block",
                fontSize: "20px",
              }}
            >
              {" "}
              Select Resume
            </label>
            <input type="file" accept=".jpg,.jpeg,.png,.webp" onChange={handleFileChange} name="resume" style={{ width: "100%" }}/>
          </div>
          <button type="submit">Send Application</button>
        </form>
      </div>
    </section>
  );
};

export default Application;
