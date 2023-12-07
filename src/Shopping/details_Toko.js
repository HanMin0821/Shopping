import {useParams} from 'react-router-dom';
import {useState, useEffect} from 'react';
import * as client from "./clients";
function Details_Toko(){
    const {id} = useParams();
    const [item, setItem] = useState(null);

    const fetchItem = async () => {
        const item = await client.fetchItemById(decodeURIComponent(id));
        setItem(item);
    }

    useEffect(() => {
        fetchItem();
    }, [id]);

    if (!item) {
        return <div>Loading...</div>;
    }

    return(
        <div>
            {/*<pre>{JSON.stringify(item, null, 2)}</pre>*/}
            <h3> Title: {item.title}</h3>
            <img src={item.image}/>
            <h3> Price: {item.price}</h3>
            <h3>Description : {item.description}</h3>
            <h3>Name of Seller: {item.seller.name}</h3>
            <img src={item.seller.image}/>
        </div>

    );
}
export default Details_Toko

