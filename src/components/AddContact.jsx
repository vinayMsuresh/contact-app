import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AddContact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const navigate = useNavigate();

  const handleSave = (e) => {
    e.preventDefault();
    if (email === "" || name === "" || phone === "") {
      alert("Please fill all the fields");
      return;
    }
    const contactsData = JSON.parse(localStorage.getItem("contact")) || [];
    let contactExists = contactsData.find(
      (item) => item.email === email || item.phone === phone
    );
    console.log(contactExists);
    if (contactExists) {
      alert(
        "Another contact with same email or phone exists! \n Please edit the existing record"
      );
    } else {
      contactsData.push({ name, email, phone });
      localStorage.setItem("contact", JSON.stringify(contactsData));
      navigate("/");
    }
  };
  return (
    <form className="container border mt-3 p-3 w-50">
      <div className="form-group row">
        <label htmlFor="name" className="col-sm-2 col-form-label ">
          Name <span className="text-danger">*</span>
        </label>
        <div className="col-sm-10">
          <input
            type="text"
            className="form-control"
            id="name"
            placeholder="Name"
            onChange={(e) => setName(e.target.value)}
          />
        </div>
      </div>
      <div className="form-group row">
        <label htmlFor="email" className="col-sm-2 col-form-label ">
          Email <span className="text-danger">*</span>
        </label>
        <div className="col-sm-10">
          <input
            type="text"
            className="form-control"
            id="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
      </div>
      <div className="form-group row">
        <label htmlFor="phone" className="col-sm-2 col-form-label">
          Telephone <span className="text-danger">*</span>
        </label>
        <div className="col-sm-10">
          <input
            type="tel"
            className="form-control"
            id="phone"
            placeholder="Telephone"
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
      </div>

      <div className="d-flex justify-content-end">
        <button
          type="reset"
          className="btn btn-outline-danger"
          onClick={() => navigate("/")}
        >
          <i class="bi-x-lg mr-2"></i>
          Cancel
        </button>
        <button className="btn btn-success ml-3" onClick={handleSave}>
          <i class="bi-save mr-2"></i>Save
        </button>
      </div>
    </form>
  );
}
