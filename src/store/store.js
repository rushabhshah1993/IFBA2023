
/* Package imports */
import { configureStore } from '@reduxjs/toolkit';

/* Reducer imports */
import guestsReducer from '@/store/slices/guestSlice';
import userReducer from '@/store/slices/userSlice';

const store = configureStore({
    reducer: {
        guests: guestsReducer,
        users: userReducer
    },
    devTools: true
})

export default store;
