import {useParams} from 'react-router-dom';
import {useState, useEffect} from 'react';
import * as client from "./clients";
import * as userClient from "./users/client"
import * as likeClient from "./likes/client"
function Details_Toko(){
    const id = decodeURIComponent(useParams().id);
    const [item, setItem] = useState(null);
    const[currentUser, setCurrentUser] = useState(null);
    const[likes, setLikes] = useState(0);

    const fetchItem = async () => {
        const item = await client.fetchItemById(id);
        setItem(item);
    }
    const fetchUsersLikeItem = async () =>{
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
    }

    useEffect(() => {
        fetchItem();
        fetchCurrentUser();
        fetchUsersLikeItem()
    }, [id]);

    if (!item) {
        return <div>Loading...</div>;
    }

    return(
        <div>

            <h3> Title: {item.title}</h3>
            <img src={item.image}/>
            <h3> Price: {item.price}</h3>
            <h3>Description : {item.description}</h3>
            <h3>Name of Seller: {item.seller.name}</h3>
            <img src={item.seller.image}/>
            <button onClick={createUserLikeItem}>Likes</button>
            <pre>{JSON.stringify(likes, null ,2)}</pre>
        </div>

    );
}
export default Details_Toko

