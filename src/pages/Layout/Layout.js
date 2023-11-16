/* Package imports */
import React from 'react';
import { 
    Routes, Route, BrowserRouter, 
    Link, Outlet 
} from "react-router-dom";

/* Component imports */
import Main from '@/pages/Main/Main';
import Home from '@/pages/Home/Home';

const Layout = () => {
    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route element={<BreadCrumb />} >
                        <Route path="/" element={<Home />} />
                        <Route path="/code" element={<Main />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </div>
    )
}

const BreadCrumb = () => {
    console.log("Here");
    return (
        <div>
            <nav>
                <ul>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/code">Code</Link>
                    </li>
                </ul>
            </nav>
            <Outlet />
        </div>
    )
} 

export default Layout;