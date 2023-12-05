import { Routes, Route, Link } from "react-router-dom";
import Home from "./home";
import Signin from "./signIn";
import Signout from "./signout";
import Account from "./account";
import Signup from "./signup";
import Detail from"./detail"

function Shopping(){

    return(
        <div className="container-fluid">
            <h1>Shopping</h1>
            <div className="row">
                <div className="col-2">
                    <div className="list-group">
                        <Link to = "/" className="list-group-item">
                            Home
                        </Link>
                        <Link to = "/account" className="list-group-item">
                            Account
                        </Link>
                        <Link to = "/signup" className="list-group-item">
                            Signup
                        </Link>
                        <Link to = "/signin" className="list-group-item">
                            SignIn
                        </Link>
                        <Link to = "/signout" className="list-group-item">
                            SignOut
                        </Link>

                    </div>
                </div>
                <div className="col-10">
                    <Routes>
                        <Route path = "/" element={<Home/>}/>
                        <Route path = "/item/:id" element={<Detail/>}/>
                        <Route path = "/signin" element={<Signin/>}/>
                        <Route path = "/signout" element={<Signout/>}/>
                        <Route path = "/account" element={<Account/>}/>
                        <Route path = "/signup" element={<Signup/>}/>

                    </Routes>
                </div>
            </div>
        </div>

    )
}
export default Shopping;