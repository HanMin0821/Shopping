import {Link, useParams} from 'react-router-dom';
import React, {useState, useEffect} from 'react';
import * as client from "./clients";
import * as userClient from "./users/client"
import * as likeClient from "./likes/client"

function Details_Toko() {
    const id = decodeURIComponent(useParams().id);
    const [item, setItem] = useState(null);
    const [currentUser, setCurrentUser] = useState(null);
    const [likes, setLikes] = useState(0);

    const fetchItem = async () => {
        const item = await client.fetchItemById(id);
        setItem(item);
    }
    const fetchUsersLikeItem = async () => {
        const likes = await likeClient.findAllLikes(id);
        setLikes(likes);
    }
    const fetchCurrentUser = async () => {
        const user = await userClient.account();
        setCurrentUser(user);
    }
    const createUserLikeItem = async () => {
        const like = await likeClient.createUserLikeItem(id, currentUser._id)
        setLikes([like, ...likes]);
        fetchUsersLikeItem();
    }

    useEffect(() => {
        fetchItem();
        fetchCurrentUser();
        fetchUsersLikeItem()
    }, [id]);

    if (!item) {
        return <div>Loading...</div>;
    }

    return (
        <div>

            <div className="card mb-3" style={{width:800}}>
                <div className="row g-0">
                    <div className="col-md-4">
                        <img src={item.image} className="img-fluid rounded-start" alt="..."/>
                    </div>
                    <div className="col-md-8">
                        <div className="card-body">
                            <h5 className="card-title">Product: {item.title}</h5>
                            <p className="card-text">Price: {item.price}</p>
                            <p className="card-text">Description : {item.description}</p>
                            <p className="card-text"></p>
                            <p className="card-text"></p>
                            <hr/>
                            <p class="card-text"><small class="text-body-secondary">Name of
                                Seller: {item.seller.name}</small></p>
                            <div className="row">
                                {currentUser && ( <div className="col">
                                    <button onClick={createUserLikeItem}>Likes</button>
                                </div>)}

                                <div className="col">
                                    {likes.map((u) => (
                                        <div key={u._id}>
                                            <Link to={`/shopping/profiles/${u.user._id}`}
                                                  style={{textDecoration: 'none', color: 'seagreen'}}><p
                                                className="card-text">{u.user.username}</p></Link>
                                        </div>
                                    ))}

                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>

);
}
export default Details_Toko

