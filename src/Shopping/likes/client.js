import axios from "axios";

const API_BASE = process.env.REACT_APP_API_BASE || "http://localhost:4000";
const SHOPPING_API = `${API_BASE}/api/shopping`;
const USERS_API = `${API_BASE}/api/users`

const ITEM_API = `${SHOPPING_API}/items`;

export const createUserLikeItem = async (itemId, userId) => {
    const response = await axios.post(`${ITEM_API}/${encodeURIComponent(itemId)}/like/${userId}`);
    return response.data;
}
export const createUserLikeHomeItem = async (itemId, userId) => {
    const response = await axios.post(`${ITEM_API}/${itemId}/like/${userId}`);
    return response.data;
}

export const findAllLikes = async (itemId) => {
    const response = await axios.get(`${ITEM_API}/like/${encodeURIComponent(itemId)}`);
    return response.data;
}

// In your frontend client.js
export const findSellersOfLikedItems = async (userId) => {
    // Corrected URL to match user-related operations
    const response = await axios.get(`${USERS_API}/${encodeURIComponent(userId)}/liked-items`);
    return response.data;
};
export const deleteUserLikeItem = async (itemId, userId) => {
    const response = await axios.delete(`${ITEM_API}/${encodeURIComponent(itemId)}/like/${userId}`);
    return response.data;
}
