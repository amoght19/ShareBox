import axios from "axios";

export const UploadFile = async (data) => {
  const API_URL = "https://sharebox.onrender.com";
  try {
    let response = await axios.post(`${API_URL}/upload`, data);
    return response.data;
  } catch (err) {
    console.log(err.message);
  }
};
