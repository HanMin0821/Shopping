import React, {useEffect, useState} from "react";
import * as client from "./clients";
import {findAllItems, update} from "./clients";
import {Link} from "react-router-dom";
import {BsPencil, BsTrash3Fill} from "react-icons/bs";
import "./index.css"

function Home() {
    const [items, setItems] = useState([]);
    const [isCreateMode, setIsCreateMode] = useState(true);
    const [item, setItem] = useState({
        name: "",
        category: "",
        description: "",
        price: "",
        email: "",
        productionDate: "",
        expirationDate: ""
    });
    const fetchItems = async () => {
        const items = await client.findAllItems();
        setItems(items);
    };

    const createItem = async () => {
        try {
            delete item._id;
            await client.createItem(item);
            fetchItems();
        } catch (err) {
            console.log(err);
        }
    }

    const deleteItem = async (item) => {
        try {
            await client.deleteItem(item);
            fetchItems();
        } catch (err) {
            console.log(err);
        }
    }

    const chosenItem = async (item) => {
        setIsCreateMode(false);
        const seletedItem = await client.findItemById(item._id);
        setItem(seletedItem);
    }
    const updateItem = async () => {
        try {
            await client.update(item);
            fetchItems();
            setIsCreateMode(true);
        } catch (err) {
            console.log(err);
        }
    }


    useEffect(() => {
        fetchItems();
    }, []);

    let createButton = <button className="btn btn-success wd-30 float-end" onClick={createItem}>Post Product</button>
    let updateButton = <button className="btn btn-primary wd-30 float-end" onClick={updateItem}>Update Product</button>;
    return (
        <div className="row">
            <div className="col-9">

                <h2>Latest Products</h2>
                <hr/>
                <table className="table">
                    <thead>
                    <tr>
                        <th>ItemName</th>
                        <th>Item Category</th>
                        <th>Item Description</th>
                        <th>Price</th>
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
                            <td>{item.price}</td>
                            <td>
                                <button className="btn btn-danger wd-50 float-end"
                                        onClick={() => deleteItem(item)}>Delete
                                </button>
                                <button className="btn btn-warning wd-50 float-end"
                                        onClick={() => chosenItem(item)}>Edit
                                </button>
                            </td>
                        </tr>))}
                    </tbody>
                </table>
            </div>
            <div className="col-3">
                <h6>Enter product information </h6>
                <form id="text-fields">
                    <label htmlFor="text-fields-name">Name:</label>
                    <br/>
                    <input id="text-fields-name" value={item.name}
                           onChange={(e) => setItem({...item, name: e.target.value})}/>
                    <br/>


                    <label htmlFor="text-fields-category">Category:</label>
                    <br/>
                    <input id="text-fields-category" value={item.category}
                           onChange={(e) => setItem({...item, category: e.target.value})}/><br/>

                    <label htmlFor="text-fields-price">Price:</label>
                    <br/>

                    <input id="text-fields-price" value={item.price}
                           onChange={(e) => setItem({...item, price: e.target.value})}/><br/>


                    <label htmlFor="text-fields-email">Email of Seller:</label>
                    <br/>
                    <input id="text-fields-email" value={item.email}
                           onChange={(e) => setItem({...item, email: e.target.value})}/><br/>

                    <label htmlFor="text-fields-productionDate">Production Date:</label>
                    <br/>
                    <input id="text-fields-productionDate"
                           value={item.productionDate}
                           placeholder="mm/dd/yyyy"
                           onChange={(e) => setItem({...item, productionDate: e.target.value})}/><br/>

                    <label htmlFor="text-fields-expirationDate">Expiration Date</label>
                    <br/>
                    <input id="text-fields-expirationDate"
                           value={item.expirationDate}
                           placeholder="mm/dd/yyyy"
                           onChange={(e) => setItem({...item, expirationDate: e.target.value})}
                    /><br/>


                    <label htmlFor="text-fields-description">Description:</label>
                    <br/>

                    <textarea id="text-fields-description" value={item.description}
                              onChange={(e) => setItem({...item, description: e.target.value})}/><br/>
                    <row>
                        {isCreateMode ? createButton : updateButton}
                    </row>

                </form>

            </div>

        </div>

    )
}

export default Home


