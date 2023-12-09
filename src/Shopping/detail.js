import * as client from "./clients";
import React, {useEffect, useState} from "react";
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

    return (

        <div>
            <div className="card border-info mb-3" style={{width: 500}}>
                <div className="card-header"><h3>
                    Product: {item.name}
                </h3></div>
                <div className="card-body">

                    <p className="card-text">Price: {item.price}</p>
                    <p className="card-text">Category: {item.category}</p>
                    <p className="card-text">Production Date: {item.productionDate}</p>
                    <p className="card-text">Expiration Date: {item.expirationDate}</p>
                    <p className="card-text">Description: {item.description}</p>
                </div>

                <div className="card-footer">
                    <small className="text-body-secondary">

                        <Link to={`/shopping/profiles/${item.seller_id}`}
                              style={{textDecoration: 'none', color: 'seagreen'}}><p
                            className="card-text">Seller: {item.seller}</p></Link>
                    </small>
                </div>
            </div>
    </div>);
}

export default Detail;