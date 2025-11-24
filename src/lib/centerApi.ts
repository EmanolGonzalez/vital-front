import api from "./apiClient";

const API_URL = "/api/centers";

export const getCenters = async () => {
  return api.get("/centers");
};

export const getCenterById = async (id: string) => {
  return api.get(`/centers/${id}`);
};

export const createCenter = async (center: any) => {
  return api.post("/centers", center);
};

export const updateCenter = async (id: string, center: any) => {
  return api.put(`/centers/${id}`, center);
};

export const deleteCenter = async (id: string) => {
  return api.del(`/centers/${id}`);
};
