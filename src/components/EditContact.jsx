import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function EditContact() {
  const { emailId } = useParams();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const navigate = useNavigate();
  const contactsData = JSON.parse(localStorage.getItem("contact"));
  useEffect(() => {
    const filteredData = contactsData.find((item) => item.email === emailId);
    setName(filteredData.name);
    setEmail(filteredData.email);
    setPhone(filteredData.phone);
  }, []);

  const handleEdit = (e) => {
    e.preventDefault();
    if (email === "" || name === "" || phone === "") {
      alert("Please fill all the fields");
      return;
    }
    const contacts = contactsData.filter((item) => item.email !== emailId);
    let contactExists = contacts.find(
      (item) => item.email === email || item.phone === phone
    );
    console.log(contactExists);
    if (contactExists) {
      alert(
        "Another contact with same email or phone exists! \n Please edit the existing record"
      );
    } else {
      let filteredData = contactsData.map((item) => {
        if (item.email === emailId) {
          return { name, email, phone };
        } else {
          return item;
        }
      });
      console.log(filteredData);
      localStorage.setItem("contact", JSON.stringify(filteredData));
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
            value={name}
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
            value={email}
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
            value={phone}
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
        <button className="btn btn-success ml-3" onClick={handleEdit}>
          <i class="bi-save mr-2"></i>Save
        </button>
      </div>
    </form>
  );
}
