import React, { useState } from "react";
import API from "../services/api";

function LeadForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    status: "NEW",
    notes: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.post("leads/", formData);

      alert("Lead Created");

      setFormData({
        name: "",
        email: "",
        company: "",
        status: "NEW",
        notes: "",
      });
    } catch (error) {
      console.log(error);
      alert("Error creating lead");
    }
  };

  return (
    <div>
      <h2>Create Lead</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
        />

        <br /><br />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
        />

        <br /><br />

        <input
          type="text"
          name="company"
          placeholder="Company"
          value={formData.company}
          onChange={handleChange}
        />

        <br /><br />

        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
        >
          <option value="NEW">NEW</option>
          <option value="CONTACTED">CONTACTED</option>
          <option value="QUALIFIED">QUALIFIED</option>
          <option value="LOST">LOST</option>
        </select>

        <br /><br />

        <textarea
          name="notes"
          placeholder="Notes"
          value={formData.notes}
          onChange={handleChange}
        />

        <br /><br />

        <button type="submit">Create Lead</button>
      </form>
    </div>
  );
}

export default LeadForm;