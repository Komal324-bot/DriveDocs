import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000", withCredentials: true });

export const loginWithGoogle = () => window.location.href = "http://localhost:5000/auth/google";
export const logout = () => API.get("/logout");
export const getUser = () => API.get("/auth/user");
export const getDriveFiles = () => API.get("/drive/files");

export const saveLetterToDrive = async (content) => {
    try {
        const response = await API.post("/drive/save", { content });
        alert("Letter saved successfully!");
        return response.data;
    } catch (error) {
        alert("Error saving letter");
    }
};
