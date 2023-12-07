import { Routes, Route, Link } from "react-router-dom";
import Home from "./home";
import Signin from "./signIn";
import Signout from "./signout";
import Account from "./account";
import Signup from "./signup";
import Detail from"./detail"
import Search from "./search";
import { useState } from "react";
import {API_KEY} from "./clients";
import Details_Toko from "./details_Toko";

function Shopping(){
    const [key, setKey] = useState("home");


    return(

        <div className="container-fluid">
            {/*<pre>{JSON.stringify(process.env, null,2)}</pre>*/}

            <h1>Shopping</h1>
            <div className="row">
                <div className="col-2">
                    <div className="list-group">
                        <Link to = "/" className="list-group-item">
                            Home
                        </Link>

                        <Link to = "/shopping/account" className="list-group-item">
                            Account
                        </Link>
                        <Link to = "/shopping/search" className="list-group-item">
                            Search
                        </Link>
                        <Link to = "/shopping/signup" className="list-group-item">
                            Signup
                        </Link>
                        <Link to = "/shopping/signin" className="list-group-item">
                            SignIn
                        </Link>
                        <Link to = "/shopping/signout" className="list-group-item">
                            SignOut
                        </Link>

                    </div>
                </div>
                <div className="col-10">
                    <Routes>
                        <Route path = "/" element={<Home/>}/>
                        <Route path = "/item/:id" element={<Detail/>}/>
                        <Route path = "/search" element={<Search/>}/>
                        <Route path = "/signin" element={<Signin/>}/>
                        <Route path = "/signout" element={<Signout/>}/>
                        <Route path = "/account" element={<Account/>}/>
                        <Route path = "/signup" element={<Signup/>}/>
                        <Route path = "/details/Toko/:id" element={<Details_Toko/>}/>

                    </Routes>
                </div>
            </div>
        </div>

    )
}
export default Shopping;