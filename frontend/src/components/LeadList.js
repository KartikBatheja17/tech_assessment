import React, { useEffect, useState } from "react";
import API from "../services/api";

function LeadList() {

  const [leads, setLeads] = useState([]);

  const fetchLeads = async () => {
    try {

      const response = await API.get("leads/");

      setLeads(response.data);

    } catch (error) {

      console.log(error);
    }
  };

  const deleteLead = async (id) => {

    try {

      await API.delete(`leads/${id}/`);

      alert("Lead Deleted");

      fetchLeads();

    } catch (error) {

      console.log(error);

      alert("Delete Failed");
    }
  };

  const updateLead = async (lead) => {

    const newName = prompt(
      "Enter Name",
      lead.name
    );

    const newEmail = prompt(
      "Enter Email",
      lead.email
    );

    const newCompany = prompt(
      "Enter Company",
      lead.company
    );

    const newStatus = prompt(
      "Enter Status",
      lead.status
    );

    const newNotes = prompt(
      "Enter Notes",
      lead.notes
    );

    if (
      !newName ||
      !newEmail ||
      !newCompany ||
      !newStatus
    ) {
      return;
    }

    try {

      await API.patch(`leads/${lead.id}/`, {
        name: newName,
        email: newEmail,
        company: newCompany,
        status: newStatus,
        notes: newNotes
      });

      alert("Lead Updated");

      fetchLeads();

    } catch (error) {

      console.log(error);

      alert("Update Failed");
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  return (
    <div>

      <h2>Lead List</h2>

      {leads.map((lead) => (

        <div
          key={lead.id}
          style={{
            border: "1px solid black",
            padding: "10px",
            marginBottom: "10px",
          }}
        >

          <p>
            <strong>Name:</strong> {lead.name}
          </p>

          <p>
            <strong>Email:</strong> {lead.email}
          </p>

          <p>
            <strong>Company:</strong> {lead.company}
          </p>

          <p>
            <strong>Status:</strong> {lead.status}
          </p>

          <p>
            <strong>Notes:</strong> {lead.notes}
          </p>

          <button
            onClick={() => updateLead(lead)}
            style={{ marginRight: "10px" }}
          >
            Update Lead
          </button>

          <button
            onClick={() => deleteLead(lead.id)}
          >
            Delete
          </button>

        </div>
      ))}
    </div>
  );
}

export default LeadList;