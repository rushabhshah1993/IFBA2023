/* Package imports */
import { createSlice } from "@reduxjs/toolkit";
import axios from 'axios';

const slice = createSlice({
    name: 'members',
    initialState: {
        members: []
    },
    reducers: {
        addMembersListToStore: (state, action) => {
            state.members = action.payload.data;
        }
    }
});

export const { addMembersListToStore } = slice.actions;

export const fetchMembersList = () => (dispatch) => {
    axios.get('https://ifba-23-default-rtdb.firebaseio.com/members.json')
    .then(response => {
        dispatch(addMembersListToStore({
            data: response.data
        }));
    })
    .catch(error => {
        console.error("Error in fetching the members list:   ", error);
    })
}

export default slice.reducer;
