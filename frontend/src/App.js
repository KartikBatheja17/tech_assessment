import React from "react";
import LeadForm from "./components/LeadForm";
import LeadList from "./components/LeadList";
import AuditHistory from "./components/AuditHistory";

function App() {
  return (
    <div style={{ padding: "20px" }}>
      <h1>Lead Audit System</h1>

      <LeadForm />

      <hr />

      <LeadList />

      <hr />

      <AuditHistory />
    </div>
  );
}

export default App;