import axios from "axios";
const  API_BASE = process.env.REACT_APP_API_BASE || "http://localhost:4000";
const SHOPPING_API= `${API_BASE}/api/shopping`;

export const findAllItems = async ()=>{
    const response = await axios.get(SHOPPING_API)
    return response.data;
};
export const findItemById = async (id)=>{
    const response = await axios.get(`${SHOPPING_API}/item/${id}`)
}