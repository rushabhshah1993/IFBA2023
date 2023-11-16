/* Package imports */
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';

/* Component imports */
import Home from '@/pages/Home/Home';

/* Store imports */
import store from '@/store/store';
import { fetchGuestList } from './store/slices/guestSlice';

store.dispatch(fetchGuestList());

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <Provider store={store}>
        <Home />
    </Provider>
);
