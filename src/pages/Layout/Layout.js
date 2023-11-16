/* Package imports */
import React from 'react';
import { Routes, Route, BrowserRouter } from "react-router-dom";

/* Component imports */
import Main from '@/pages/Main/Main';
import Home from '@/pages/Home/Home';

const Layout = () => {
    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/code" element={<Main />} />
                </Routes>
            </BrowserRouter>
        </div>
    )
}

export default Layout;