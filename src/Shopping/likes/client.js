import axios from "axios";

const API_BASE = process.env.REACT_APP_API_BASE || "http://localhost:4000";
const SHOPPING_API = `${API_BASE}/api/shopping`;

const ITEM_API = `${SHOPPING_API}/items`;

export const createUserLikeItem = async (itemId, userId) => {
    const response = await axios.post(`${ITEM_API}/${encodeURIComponent(itemId)}/like/${userId}`);
    return response.data;
}

export const findAllLikes = async (itemId) => {
    const response = await axios.get(`${ITEM_API}/like/${encodeURIComponent(itemId)}`);
    return response.data;
}
