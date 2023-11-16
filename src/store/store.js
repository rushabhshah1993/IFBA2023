
/* Package imports */
import { configureStore } from '@reduxjs/toolkit';

/* Reducer imports */
import guestsReducer from '@/store/slices/guestSlice';

const store = configureStore({
    reducer: {
        guests: guestsReducer
    },
    devTools: true
})

export default store;
