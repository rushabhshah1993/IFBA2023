/* Package imports */
import React from 'react';
import { Routes, Route, BrowserRouter } from "react-router-dom";

/* Component imports */
import Home from '@/pages/Home/Home';
import Login from '@/pages/Login/Login';
import Main from '@/pages/Main/Main';
import BreadCrumb from '@/components/BreadCrumb/BreadCrumb';

const Layout = () => {
    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route element={<BreadCrumb />} >
                        <Route path="/" element={<Home />} />
                        <Route path="/home" element={<Home />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/code" element={<Main />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </div>
    )
}

export default Layout;
