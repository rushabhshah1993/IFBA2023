/* Package imports */
import React from 'react';
import { Routes, Route, BrowserRouter } from "react-router-dom";

/* Component imports */
import AddGuest from '@/pages/AddGuest/AddGuest';
import Home from '@/pages/Home/Home';
import Login from '@/pages/Login/Login';
import Main from '@/pages/Main/Main';
import ScannedGuest from '../ScannedGuest/ScannedGuest';
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
                        <Route path="/guests" element={<Main />} />
                        <Route path="/add-guests" element={<AddGuest />} />
                        <Route path="/scanned-guest" element={<ScannedGuest />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </div>
    )
}

export default Layout;
