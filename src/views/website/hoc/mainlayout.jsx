import React from 'react';

import {
    Outlet
} from "react-router-dom";
import Header from './header';
import Footer from './footer';

const MainLayout = (props) => {

    return (
        <div id="mainwebsite">
            <Header />
            <Outlet />
            <Footer />
        </div>
    )
}

export default MainLayout;