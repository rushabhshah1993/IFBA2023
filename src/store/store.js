
/* Package imports */
import { configureStore } from '@reduxjs/toolkit';

/* Reducer imports */
import guestsReducer from '@/store/slices/guestSlice';
import userReducer from '@/store/slices/userSlice';
import membersReducer from '@/store/slices/memberSlice';

const store = configureStore({
    reducer: {
        guests: guestsReducer,
        members: membersReducer,
        users: userReducer
    },
    devTools: true
})

export default store;
