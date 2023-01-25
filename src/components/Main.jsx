import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Main() {
  const [contacts, setContacts] = useState([]);
  const [searchInp, setSearchInp] = useState("");
  const [contactsData, setContactsData] = useState(
    JSON.parse(localStorage.getItem("contact")) || []
  );
  useEffect(() => {
    setContacts(contactsData);
  }, []);
  const navigate = useNavigate();

  const handleDelete = (contact) => {
    if (
      window.confirm(`Are you sure you want to delete contact ${contact.name}`)
    ) {
      let filterData = contactsData.filter(
        (item) => item.email !== contact.email
      );
      console.log(filterData);
      setContactsData(filterData);
      setContacts(filterData);
      localStorage.setItem("contact", JSON.stringify(filterData));
    }
  };

  const handleSearch = (e) => {
    const { value } = e.target;
    let searchData = contactsData.filter(
      (item) =>
        item.name.toLowerCase().includes(value.toLowerCase()) ||
        item.email.toLowerCase().includes(value.toLowerCase()) ||
        item.phone.toLowerCase().includes(value.toLowerCase())
    );
    setContacts(searchData);
  };
  return (
    <div className="container">
      <div className="d-flex justify-content-between mt-4 p-3 border">
        <input
          className="form-control mr-sm-2 w-50"
          type="search"
          onChange={handleSearch}
          placeholder="Search"
          aria-label="Search"
        />
        <button
          className="btn btn-success my-2 my-sm-0"
          onClick={() => navigate("/add")}
        >
          <i class="bi-plus-lg mr-2"></i>New Contact
        </button>
      </div>
      {contacts.length > 0 ? (
        <div className="mt-3">
          {contacts.map((contact) => (
            <div className="card" key={contact.email}>
              <div className="card-body d-flex justify-content-between">
                <div>
                  <h2>{contact.name}</h2>
                  <p>{contact.email}</p>
                  <p>{contact.phone}</p>
                </div>
                <div className="d-flex h-50">
                  <button
                    className="btn btn-outline-danger mr-2 p-2 btn-sm"
                    onClick={() => handleDelete(contact)}
                  >
                    <i class="bi-trash mr-1"></i> Delete
                  </button>
                  <button
                    className="btn btn-warning"
                    onClick={() => navigate(`/edit/${contact.email}`)}
                  >
                    <i class="bi-pencil-square mr-1"></i>Edit
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="d-flex justify-content-center">
          <div className="alert alert-primary mt-4 w-50" role="alert">
            <i class="bi-info-square-fill mr-2"></i>You have no contacts
            currently.
          </div>
        </div>
      )}
    </div>
  );
}
