import * as client from "./clients";
import {useEffect, useState} from "react";
import {Link, useNavigate, useParams} from "react-router-dom";


function Detail() {
    const {id} = useParams();
    const [item, setItem] = useState(null);

    const fetchItemById = async () => {
        try {
            const fetchedItem = await client.findItemById(id);
            setItem(fetchedItem);
        } catch (error) {
            console.error("Error fetching item:", error);
        }
    };

    useEffect(() => {
        fetchItemById()
    }, [id]);

    if (!item) {
        return <div>item not found...</div>;
    }

    return (<div>
        <h3>Name: {item.name}</h3>
        <h3>Category: {item.category}</h3>
        <h3>Price: {item.price}</h3>
        <h3>ProductionDate: {item.productionDate}</h3>
        <h3>ExpirationDate: {item.expirationDate}</h3>
        <h3>Seller's Email: {item.email}</h3>
        <h3>Description: {item.description}</h3>
    </div>);
}

export default Detail;