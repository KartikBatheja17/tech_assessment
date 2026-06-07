import axios from "axios";

const API = axios.create({
    baseURL: "http://127.0.0.1:8000/api/",
});

// export const createLead = (leadData) => API.post("/leads/", leadData);
// export const getLeads = () => API.get("/leads/");
// export const updateLead = (id, leadData) => API.put(`/leads/${id}/`, leadData);
// export const deleteLead = (id) => API.delete(`/leads/${id}/`);
// export const restoreLead = (id) => API.post(`/leads/${id}/restore/`);
// export const getAuditHistory = (id) => API.get(`/leads/${id}/audit-logs/`);

export default API;