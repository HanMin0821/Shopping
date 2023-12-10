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
import ProfilesList from "./profilesList";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faSearch, faUserPlus, faSignInAlt, faUser } from '@fortawesome/free-solid-svg-icons'


function Shopping(){
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [key, setKey] = useState("home");
    const { pathname } = useLocation();
    return(

        <div className="container-fluid">
            <div class="shopping-banner">
            <h1>Shopping Page</h1>
            </div>
            <div className="row">
                <div className="col-2">
                    <div className="nav-bar">
                        <Link to = "/shopping/home" className="list-group-item list-group-item-primary" >
                            <FontAwesomeIcon icon={faHome}  size="2x"/>Home
                        </Link>

                        <Link to = "/shopping/search" className="list-group-item list-group-item-primary">
                            <FontAwesomeIcon icon={faSearch}  size="2x"/>Search
                        </Link>
                        <Link to = "/shopping/signup" className="list-group-item list-group-item-primary">
                            <FontAwesomeIcon icon={faUserPlus}  size="2x"/>Signup
                        </Link>
                        {!isAuthenticated && (
                            <Link to="/shopping/signin" className="list-group-item list-group-item-primary">
                                <FontAwesomeIcon icon={faSignInAlt}  size="2x"/>SignIn
                            </Link>
                        )}
                        <Link to = "/shopping/profiles" className="list-group-item list-group-item-primary">
                            <FontAwesomeIcon icon={faUser}  size="2x"/>Profile
                        </Link>
                    </div>
                </div>
                <div className="col-10">
                    <Routes>
                        <Route path = "/" element={<Home/>}/>
                        <Route path = "/home" element={<Home/>}/>
                        <Route path = "/home/item/:id" element={<Detail/>}/>
                        <Route path = "/search" element={<Search/>}/>
                        <Route path = "/signin" element={<Signin setIsAuthenticated={setIsAuthenticated} />}/>
                        {/* <Route path = "/signout" element={<Signout/>}/> */}
                        <Route path = "/profile" element={<Account setIsAuthenticated={setIsAuthenticated}/>}/>
                        <Route path = "/signup" element={<Signup/>}/>
                        <Route path = "/details/:id" element={<Details_Toko/>}/>
                        {/* <Route path="/users" element={<UserList />} /> */}
                        <Route path="/users/table" element={<UserTable />} />
                        <Route path="/profiles" element={<ProfilesList />} />
                        <Route path="/profiles/:profileId" element={<ProfilePage isAuthenticated={isAuthenticated}/>} />
                    </Routes>
                </div>
            </div>
        </div>

    )
}
export default Shopping;