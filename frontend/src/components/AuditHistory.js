import React, { useEffect, useState } from "react";
import API from "../services/api";

function AuditHistory() {
  const [logs, setLogs] = useState([]);

  const fetchLogs = async () => {
    try {
      const response = await API.get("audit-logs/");
      setLogs(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const restoreVersion = async (leadId, auditId) => {
    try {
      await API.post(`leads/${leadId}/restore/${auditId}/`);

      alert("Lead Restored Successfully");

      fetchLogs();

    } catch (error) {
      console.log(error);

      alert("Restore Failed");
    }
  };

  useEffect(() => {
    fetchLogs();
  }, []);

  return (
    <div>
      <h2>Audit History</h2>

      {logs.map((log) => (
        <div
          key={log.id}
          style={{
            border: "1px solid blue",
            padding: "10px",
            marginBottom: "10px",
          }}
        >
          <p>
            <strong>Action:</strong> {log.action}
          </p>

          <p>
            <strong>Timestamp:</strong> {log.timestamp}
          </p>

          <p>
            <strong>Lead ID:</strong> {log.lead}
          </p>

          <p>
            <strong>Old Data:</strong>
          </p>

          <pre>
            {JSON.stringify(log.old_data, null, 2)}
          </pre>

          <p>
            <strong>New Data:</strong>
          </p>

          <pre>
            {JSON.stringify(log.new_data, null, 2)}
          </pre>

          <button
            onClick={() =>
              restoreVersion(log.lead, log.id)
            }
          >
            Restore Version
          </button>
        </div>
      ))}
    </div>
  );
}

export default AuditHistory;