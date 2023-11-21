/* Package imports */
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { library } from '@fortawesome/fontawesome-svg-core';
import { 
    faEye, faEyeSlash, faSearch,
    faUserPlus, faChevronLeft, faSpinner
} from '@fortawesome/free-solid-svg-icons';


/* Component imports */
import Layout from '@/pages/Layout/Layout';
import Login from '@/pages/Login/Login';

/* Store imports */
import store from '@/store/store';
import { fetchGuestList } from '@/store/slices/guestSlice';
import { fetchUsers, userLoggedIn, setActiveUser } from '@/store/slices/userSlice';
import { fetchMembersList } from '@/store/slices/memberSlice';

/* Style imports */
import './index.scss';

store.dispatch(fetchGuestList());
store.dispatch(fetchMembersList());
store.dispatch(fetchUsers());

library.add(
    faEye, faEyeSlash, faSearch,
    faUserPlus, faChevronLeft,
    faSpinner
);

let isLoggedIn = localStorage.getItem('expiryStart');
if(isLoggedIn && new Date().getTime() > parseInt(isLoggedIn)+14400000) {
    localStorage.removeItem('expiryStart');
    store.dispatch(userLoggedIn(false));
    store.dispatch(setActiveUser({}));
} 

const root = ReactDOM.createRoot(document.getElementById('root')); 

root.render(
    <Provider store={store}>
        { 
            isLoggedIn && new Date().getTime() < parseInt(isLoggedIn)+14400000 ?
            <Layout /> :
            <Login />
        }
    </Provider>
);
