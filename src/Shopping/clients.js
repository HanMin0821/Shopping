import axios from "axios";

const API_BASE = process.env.REACT_APP_API_BASE || "http://localhost:4000";
const SHOPPING_API = `${API_BASE}/api/shopping`;
export const RAPID_API = 'https://real-time-product-search.p.rapidapi.com/';
export const API_KEY = process.env.REACT_APP_RAPID_API_KEY;

export const findAllItems = async () => {
    const response = await axios.get(`${SHOPPING_API}/items`)
    return response.data;
};
export const findItemById = async (id) => {
    const response = await axios.get(`${SHOPPING_API}/item/${id}`)
    return response.data;
}

export const createItem = async (item) => {
    const response = await axios.post(`${SHOPPING_API}`, item)
    return response.data;
}

export const deleteItem = async (item) => {
    const response = await axios.delete(`${SHOPPING_API}/${item._id}`)
    return response.data;
}
export const update = async (item) => {
    const response = await axios.put(`${SHOPPING_API}/${item._id}`, item)
    return response.data;
}


export const searchProducts = async (query) => {
    const options = {
        method: 'GET',
        url: 'https://tokopediaapi.p.rapidapi.com/',
        params: {
            act: 'search',
            query: query,
        },
        headers: {
            'X-RapidAPI-Key': `${API_KEY}`,
            'X-RapidAPI-Host': 'tokopediaapi.p.rapidapi.com'
        }
    };

    try {
        const response = await axios.request(options);
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error(error);
    }
};

export const fetchItemById = async (id) => {
    const options = {
        method: 'GET',
        url: 'https://tokopediaapi.p.rapidapi.com/',
        params: {
            act: 'detail',
            slug: `${id}`,
            _pretty: 'true'
        },
        headers: {
            'X-RapidAPI-Key': `${API_KEY}`,
            'X-RapidAPI-Host': 'tokopediaapi.p.rapidapi.com'
        }
    }

    try {
        const response = await axios.request(options);
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error(error);
    }
};


export const fetchCurrentUser = async () => {
    const response = await axios.get(`${SHOPPING_API}/current-user`);
    return response.data;
}

