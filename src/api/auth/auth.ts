import axios from "axios";

const API_URL = "http://192.168.30.88:8080/santusht/auth";

export const login = async (credentials: {
    username: string;
    password: string;
}) => {
    const response = await axios.post(`${API_URL}/login`, credentials);
    return response.data; // Expected response: { token, role, username }
};
