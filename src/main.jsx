import React from 'react';
import ReactDOM from 'react-dom/client';

import { Provider } from 'react-redux';
import configureStore from './storeredux/store';
import Routes from './routes';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={configureStore}>
      <ToastContainer />
      <Routes />
    </Provider>
  </React.StrictMode>,
)
