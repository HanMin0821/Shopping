import axios from "axios";
const  API_BASE = process.env.REACT_APP_API_BASE || "http://localhost:4000";
const SHOPPING_API= `${API_BASE}/api/shopping`;

export const findAllItems = async ()=>{
    const response = await axios.get(SHOPPING_API)
    return response.data;
};
export const findItemById = async (id)=>{
    const response = await axios.get(`${SHOPPING_API}/item/${id}`)
    return response.data;
}

export const createItem = async (item)=>{
    const response = await axios.post(`${SHOPPING_API}`, item)
    return response.data;
}

export const deleteItem = async (item)=>{
    const response = await axios.delete(`${SHOPPING_API}/${item._id}`)
    return response.data;
}
export const update = async (item)=>{
    const response = await axios.put(`${SHOPPING_API}/${item._id}`, item)
    return response.data;
}