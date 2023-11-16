/* Package imports */
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';


/* Component imports */
import Home from '@/pages/Home/Home';
import Login from './pages/Login/Login';

/* Store imports */
import store from '@/store/store';
import { fetchGuestList } from '@/store/slices/guestSlice';
import { fetchUsers } from '@/store/slices/userSlice';

/* Style imports */
import './index.scss';

store.dispatch(fetchGuestList());
store.dispatch(fetchUsers());

library.add(faEye, faEyeSlash);

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <Provider store={store}>
        <Login />
    </Provider>
);
