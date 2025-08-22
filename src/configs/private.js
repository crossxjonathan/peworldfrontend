// src/configs/private.js
/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React, { useEffect } from 'react';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const navigate = useNavigate();
  useEffect(() => {
      const token = Cookies.get('token');
      if (!token) {
          return navigate('/auth/login');
      }
  })
    return children;
}

export default PrivateRoute;
