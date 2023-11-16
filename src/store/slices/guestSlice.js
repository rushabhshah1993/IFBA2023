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
            state.guests = action.payload.data;
        }
    }
});

export const { addGuestsListToStore } = slice.actions;

export const fetchGuestList = () => (dispatch) => {
    axios.get('https://ifba-23-default-rtdb.firebaseio.com/guests.json')
    .then(response => {
        dispatch(addGuestsListToStore({
            data: response.data
        }));
    })
    .catch(error => {
        console.error("Error in fetching the guests list:   ", error);
    })
};

export default slice.reducer; 
