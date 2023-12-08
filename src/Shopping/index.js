import { Routes, Route, Link, useLocation } from "react-router-dom";
import Home from "./home";
import Signin from "./users/signin";
import Account from "./users/account";
import Signup from "./users/signup";
import UserTable from "./users/table";
import ProfilePage from "./proflie";
import Detail from"./detail"
import Search from "./search";
import { useState } from "react";
import {API_KEY} from "./clients";
import Details_Toko from "./details_Toko";
import "./index.css"

function Shopping(){
    const [key, setKey] = useState("home");
    const { pathname } = useLocation();
    return(

        <div className="container-fluid">
            <h1>Shopping</h1>
            <div className="row">
                <div className="col-2">
                    <div className="list-group">
                        <Link to = "/" className="list-group-item list-group-item-primary" >
                            Home
                        </Link>

                        {/*<Link to = "/shopping/account" className="list-group-item list-group-item-primary">*/}
                        {/*    Account*/}
                        {/*</Link>*/}
                        <Link to = "/shopping/search" className="list-group-item list-group-item-primary">
                            Search
                        </Link>
                        <Link to = "/shopping/signup" className="list-group-item list-group-item-primary">
                            Signup
                        </Link>
                        <Link to = "/shopping/signin" className="list-group-item list-group-item-primary">
                            SignIn
                        </Link>
                        <Link to = "/shopping/profile" className="list-group-item list-group-item-primary">
                            Profile
                        </Link>
                    </div>
                </div>
                <div className="col-10">
                    <Routes>
                        <Route path = "/" element={<Home/>}/>
                        <Route path = "/item/:id" element={<Detail/>}/>
                        <Route path = "/search" element={<Search/>}/>
                        <Route path = "/signin" element={<Signin/>}/>
                        {/* <Route path = "/signout" element={<Signout/>}/> */}
                        <Route path = "/account" element={<Account/>}/>
                        <Route path = "/signup" element={<Signup/>}/>
                        <Route path = "/details/Toko/:id" element={<Details_Toko/>}/>
                        {/* <Route path="/users" element={<UserList />} /> */}
                        <Route path="/users/table" element={<UserTable />} />
                        <Route path="/profile" element={<UserTable />} />
                    </Routes>
                </div>
            </div>
        </div>

    )
}
export default Shopping;