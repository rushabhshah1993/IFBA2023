/* Package imports */
import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import CryptoJS from 'crypto-js';

const slice = createSlice({
    name: 'users',
    initialState: {
        users: [],
        loggedIn: false,
        activeUser: {}
    },
    reducers: {
        addUsersToStore: (state, action) => {
            state.users = [...action.payload];
        },
        userLoggedIn: (state, action) => {
            state.loggedIn = action.payload;
        },
        setActiveUser: (state, action) => {
            state.activeUser = action.payload;
        }
    }
})

export const { addUsersToStore, userLoggedIn, setActiveUser } = slice.actions;

export const fetchUsers = () => (dispatch) => {
    axios.get('https://ifba-23-default-rtdb.firebaseio.com/users.json')
    .then(response => {
        dispatch(addUsersToStore(response.data));
    })
    .catch(error => {
        console.error("Error in fetching users:   ", error);
    })
}

export const checkIfUserAuthenticated = (name, password) => async (dispatch, getState) => {
    const state = getState();
    return axios.get('https://ifba-23-default-rtdb.firebaseio.com/phrase.json')
    .then(response => {
        let phrase = response.data;
        if(phrase && state.users.users) {
            const users = state.users.users;
            const userExists = users.find(item => item.username === name);
            
            const decryptedBytes = CryptoJS.AES.decrypt(userExists.pass, phrase);
            const decryptedPassword = decryptedBytes.toString(CryptoJS.enc.Utf8);

            if(decryptedPassword === password) {
                dispatch(userLoggedIn(true));
                dispatch(setActiveUser(userExists));
                localStorage.setItem('expiryStart', new Date().getTime());
                return true;
            }
            return false;
        }
    })
    .catch(error => {
        console.error("Error in fetching catchphrase:   ", error);
    })
}

export default slice.reducer;
