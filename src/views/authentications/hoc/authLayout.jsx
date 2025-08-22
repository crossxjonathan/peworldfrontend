import React from 'react';

import {
    Outlet
} from "react-router-dom";
import LeftPage from './leftpage';

const AuthLayout = (props) => {

    return (
        <div id="mainauthentication">
            <div className='authWrapper'>
                <LeftPage />
                <div className='rightWrapper'>
                    <Outlet />
                </div>
            </div>
        </div>
    )
}

export default AuthLayout;