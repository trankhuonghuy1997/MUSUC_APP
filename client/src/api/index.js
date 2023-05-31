import axios from "axios";
const baseUrl = "http://localhost:5000/";
export const validateUser = async (token) => {
  try {
    const response = await axios.get(`${baseUrl}api/users/login`, {
      headers: { Authorization: "Bearer " + token },
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
