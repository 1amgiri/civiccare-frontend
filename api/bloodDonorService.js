import api from "./axios";

export const getAllBloodDonors = () =>
  api.get("/api/blood-donors");

export const getBloodDonorsPaged = (page = 0, size = 5) =>
  api.get(`/api/blood-donors/paged?page=${page}&size=${size}`);

export const addBloodDonor = (donorData) =>
  api.post("/api/blood-donors", donorData);
