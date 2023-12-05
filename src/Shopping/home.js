import React, {useEffect, useState} from "react";
import * as client from "./clients";
import {findAllItems} from "./clients";
import {Link} from "react-router-dom";
import {BsPencil, BsTrash3Fill} from "react-icons/bs";

function Home() {
    const [items, setItems] = useState([]);

    const fetchItems = async () => {
        const items = await client.findAllItems();
        setItems(items);
    };
    useEffect(() => {
        fetchItems();
    }, []);


    return (
        <div>
            <h3> Choose your preferred item or post it!</h3>
            <table className="table">
                <thead>
                <tr>
                    <th>ItemName</th>
                    <th>Item Category</th>
                    <th>Item description</th>
                </tr>
                </thead>
                <tbody>
                {items.map((item) => (
                    <tr key={item._id}>
                        <td>
                            <Link to={`item/${item._id}`}>
                                {item.name}
                            </Link>
                        </td>
                        <td>{item.category}</td>
                        <td>{item.description}</td>

                    </tr>))}
                </tbody>
            </table>


        </div>

    )
}

export default Home


