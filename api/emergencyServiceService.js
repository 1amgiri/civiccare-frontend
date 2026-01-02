import api from "./axios";

export const getEmergencyServices = () =>
  api.get("/api/emergency-services");

export const addEmergencyService = (serviceData) =>
  api.post("/api/emergency-services", serviceData);
