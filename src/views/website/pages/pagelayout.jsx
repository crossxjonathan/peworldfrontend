import React from 'react';

import MainHeader from '../hoc/mainheader';
import { Outlet } from 'react-router-dom';
import Footer from '../hoc/footer';

const PageLayout = (props) => {
  return (
    <div id='pagewebsite'>
        <MainHeader/>
        <Outlet/>
        <Footer/>
    </div>
  )
}

export default PageLayout