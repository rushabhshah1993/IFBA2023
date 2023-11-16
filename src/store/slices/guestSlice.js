/* Package imports */
import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const slice = createSlice({
    name: 'guests',
    initialState: {
        guests: []
    },
    reducers: {
        addGuestsListToStore: (state, action) => {
            state.guests = action.data;
        }
    }
});

export const fetchGuestList = () => (dispatch) => {
    console.log("Here");
    axios.get('https://ifba-23-default-rtdb.firebaseio.com/guests.json')
    .then(response => {
        console.log("response:   ", response);
        // dispatch(addGuestsListToStore(response));
    })
    .catch(error => {
        console.error("Error in fetching the guests list:   ", error);
    })
};

export default slice.reducer; 