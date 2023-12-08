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

function Shopping(){
    const [key, setKey] = useState("home");
    const { pathname } = useLocation();
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

                        <Link to = "/Shopping/account" className="list-group-item">
                            Account
                        </Link>
                        <Link to = "/shopping/search" className="list-group-item">
                            Search
                        </Link>
                        <Link to = "/Shopping/signup" className="list-group-item">
                            Signup
                        </Link>
                        <Link to = "/Shopping/signin" className="list-group-item">
                            SignIn
                        </Link>
                        {/* <Link to = "/Shopping/profile" className="list-group-item">
                            Profile
                        </Link> */}
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
                        {/* <Route path="/profile" element={<ProfilePage />} /> */}
                    </Routes>
                </div>
            </div>
        </div>

    )
}
export default Shopping;