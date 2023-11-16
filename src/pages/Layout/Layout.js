/* Package imports */
import React from 'react';
import { Routes, Route, BrowserRouter } from "react-router-dom";

/* Component imports */
import Main from '@/pages/Main/Main';
import Home from '@/pages/Home/Home';
import BreadCrumb from '@/components/BreadCrumb/BreadCrumb';

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

export default Layout;
