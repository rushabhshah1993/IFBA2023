/* Package imports */
import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import cloneDeep from 'lodash/cloneDeep';


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

export const addGuestToDatabase = (data) => async (dispatch, getState) => {
    const state = getState();
    let updatedGuests = cloneDeep(state.guests.guests);
    updatedGuests.push(data);

    return axios.put('https://ifba-23-default-rtdb.firebaseio.com/guests.json', updatedGuests)
    .then(response => {
        dispatch(fetchGuestList());
        return response;
    })
    .catch(error => {
        console.error("Error in adding the guest:  ", error);
    })
}

export const updateGuestEntry = data => async (dispatch, getState) => {
    return axios.put('https://ifba-23-default-rtdb.firebaseio.com/guests.json', data)
    .then(response => {
        dispatch(fetchGuestList());
        return response;
    })
    .catch(error => {
        console.error("Error in adding the guest:  ", error);
    })
}
    

export default slice.reducer; 
