import React, {useEffect, useState} from "react";
import * as client from "./clients";
import {findAllItems, update} from "./clients";
import {Link} from "react-router-dom";
import {BsPencil, BsTrash3Fill} from "react-icons/bs";
import "./index.css"
import * as userClient from "./users/client";

function Home() {
    const [currentUser, setCurrentUser] = useState(null);
    const [items, setItems] = useState([]);
    const [isCreateMode, setIsCreateMode] = useState(true);
    const [item, setItem] = useState({
        name: "",
        category: "",
        description: "",
        price: "",
        email: "",
        productionDate: "",
        expirationDate: "",
        seller: "",
        seller_id: ""
    });
    const fetchItems = async () => {
        const items = await client.findAllItems();
        setItems(items);
    };
    const fetchCurrentUser = async () => {
        const user = await userClient.account();
        setCurrentUser(user);
    }

    const createItem = async () => {
        try {
            delete item._id;
            const newItem = {
                ...item,
                seller: currentUser.username,
                seller_id: currentUser._id
            }
            setItem(newItem)
            await client.createItem(newItem);

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
        fetchCurrentUser();
    }, []);

    let createButton = <button className="btn btn-success " style={{width: 200}} onClick={createItem}>Post Product</button>
    let updateButton = <button className="btn btn-primary" style={{width: 200}}  onClick={updateItem}>Update Product</button>;
    return (
        <div className="row">
            <div className="col-9">

                <h2>Latest Products</h2>
                <hr/>
                <div className="row">
                    <div className="row row-cols-1 row-cols-md-5 g-2">
                        {items.map((item) => (
                            <div className="col" style={{width: 400}}>
                                <div className="card border-info" style={{height: 200}} key={item._id}>
                                    <div className="card-header">
                                    <Link to={`item/${item._id}`}
                                          style={{textDecoration: 'none', color: 'inherit'}}>
                                        <h5 className="card-title">Title: {item.name}</h5>
                                    </Link>
                                    </div>
                                    <div className="card-body">
                                        <p className="card-text">Category: {item.category}</p>
                                        {currentUser && (
                                            <p className="card-text">Price: {item.price}</p>)}


                                    <div className="card-footer">


                                        {currentUser && currentUser.role === "ADMIN" && (
                                            <button className="btn btn-danger" style={{width: 280}}
                                                    onClick={() => deleteItem(item)}>Delete
                                            </button>)
                                        }


                                        {currentUser && currentUser.role === "SELLER" && item.seller_id === currentUser._id && (
                                            <button className="btn btn-danger" style={{width: 150}}
                                                    onClick={() => deleteItem(item)}>Delete
                                            </button>)
                                        }

                                        {currentUser && currentUser.role === "SELLER" && item.seller_id === currentUser._id && (
                                            <button className="btn btn-warning" style={{width: 150}}
                                                    onClick={() => chosenItem(item)}>Edit
                                            </button>
                                        )}
                                    </div>

                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className="col-3">
                {currentUser && currentUser.role === "SELLER" && (
                    <>

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

                            <textarea id="text-fields-description" value={item.description} rows={10}
                                      onChange={(e) => setItem({...item, description: e.target.value})}/><br/>
                            <row>
                                {isCreateMode ? createButton : updateButton}
                            </row>

                        </form>
                    </>
                )}
            </div>

        </div>

    )
}

export default Home


