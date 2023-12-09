import * as client from "./clients";
import React, {useEffect, useState} from "react";
import {Link, useNavigate, useParams} from "react-router-dom";
import * as userClient from "./users/client";
import * as likeClient from "./likes/client";
import {createUserLikeHomeItem} from "./likes/client";


function Detail() {
    const {id} = useParams();
    const [item, setItem] = useState(null);
    // const [currentUser, setCurrentUser] = useState(null);
    const [likes, setLikes] = useState(0);

    const fetchUsersLikeItem = async () => {
        const likes = await likeClient.findAllLikes(id);
        setLikes(likes);
    }

    const fetchItemById = async () => {
        try {
            const fetchedItem = await client.findItemById(id);
            setItem(fetchedItem);
        } catch (error) {
            console.error("Error fetching item:", error);
        }
    };
    // const fetchCurrentUser = async () => {
    //     const user = await userClient.account();
    //     setCurrentUser(user);
    // }

    // const createUserLikeItem = async () => {
    //     const like = await likeClient.createUserLikeHomeItem(id, currentUser._id)
    //     setLikes([like, ...likes]);
    //     fetchUsersLikeItem();
    // }


    useEffect(() => {
        fetchItemById();
        // fetchCurrentUser();
        fetchUsersLikeItem()
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




                    {/*{currentUser && currentUser.role === "BUYER" &&*/}
                    {/*    (<button onClick={createUserLikeItem}>Likes</button>)}*/}
                    {/*<pre>{JSON.stringify(likes, null, 2)}</pre>*/}

                    {/*{likes.map(like => (*/}
                    {/*    <h3>{like.user.username}</h3>*/}
                    {/*))}*/}
                        {/*<div className="col">*/}
                        {/*    {likes.map((u) => (*/}
                        {/*        <div key={u._id}>*/}
                        {/*            <Link to={`/shopping/profiles/${u.user._id}`}*/}
                        {/*                  style={{textDecoration: 'none', color: 'seagreen'}}><p*/}
                        {/*                className="card-text">{u.user.username}</p></Link>*/}
                        {/*        </div>*/}
                        {/*    ))}*/}
                        {/*</div>*/}

                        {/*{likes.map((u) => (*/}
                        {/*    <div key={u._id}>*/}
                        {/*        <Link to={`/shopping/profiles/${u.user._id}`}*/}
                        {/*              style={{textDecoration: 'none', color: 'seagreen'}}><p*/}
                        {/*            className="card-text">{u.user.username}</p></Link>*/}
                        {/*    </div>*/}
                        {/*))}*/}



                </div>
            </div>
    </div>);
}

export default Detail;