import * as client from "./clients";
import { useEffect, useState } from "react";
import { Link, useNavigate,useParams } from "react-router-dom";



function Detail(){
    const {id} = useParams();
    const[item, setItem] = useState(null);

    const fetchItemById = async (id) => {
        const item = await client.findItemById(id);
        setItem(item);
    };

    useEffect(() => {
        fetchItemById(id)
    }, []);
    return(
        <h3>{11111}</h3>
    )
}
export default Detail