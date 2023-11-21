/* Package imports */
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

/* Style imports */
import styles from './ScannedGuest.scss';
import isEmpty from 'lodash/isEmpty';

const ScannedGuest = props => {
    const location = useLocation();
    const searchParams = queryStringToObject(location.search);
    const allGuests = useSelector(state => state.guests.guests);
    const admins = useSelector(state => state.members.members);
    let element = null;
    let adminElement = null;
    
    const [guestData, setGuestData] = useState({});
    const [extrasCount, setExtrasCount] = useState(1);
    const [addMoreExtras, setAddMoreExtras] = useState(false);
    const [selectedAdmin, selectAdmin] = useState(null);

    useEffect(() => {
        let guest = allGuests.find(guest => guest.id === +searchParams.id);
        if(!isEmpty(guest)) setGuestData(guest);
    }, [!isEmpty(searchParams), allGuests.length])

    function queryStringToObject(queryString) {
        const params = new URLSearchParams(queryString);
        const result = {};
        for (const [key, value] of params) {
          result[key] = value;
        }
        return result;
    }

    const extrasChangeHandler = event => {
        setExtrasCount(event.target.value)
    }

    const checkInGuest = () => {
        console.log("Here");
    }


    if(admins.length) {
        console.log(admins);
        let allAdmins = admins.map((admin) => (
            <div 
                className={styles.admin}
                key={admin.id} 
                onClick={() => selectAdmin(admin.name)}>
                { admin.name }
            </div>
        ))
        adminElement = (
            <div className={styles.adminsContainer}>
                { allAdmins }
            </div>
        )
    }


    if(guestData) {
        element = (
            <div className={styles.scannedGuestContainer}>
                <p>You are checking in {guestData.firstName} {guestData.lastName}</p>
                <div className={styles.otherInfo}>
                    <span>{guestData.firstName}'s ID: {guestData.id}</span>
                    <span>{guestData.firstName}'s Email: {guestData.email}</span>
                    <span>{guestData.firstName}'s Phone Number: {guestData.phone}</span>
                    <span>Comments: {guestData.comments}</span>
                    <span>
                        {
                            guestData.plusOnes > 0 ?
                            `${guestData.firstName} should be accompanied by ${guestData.plusOnes} extras` :
                            `${guestData.firstName} should have arrived alone` 
                        }
                    </span>
                    <div>
                        <input 
                            type={'checkbox'} 
                            value={addMoreExtras} 
                            onChange={() => setAddMoreExtras(!addMoreExtras)} />
                        <span>Do you need to check in more guests?</span>
                    </div>
                    {
                        addMoreExtras ?
                        <input type={'number'} value={extrasCount} onChange={extrasChangeHandler} /> :
                        null
                    }
                    <div>
                        Checked in by:
                        { adminElement }
                    </div>
                </div>
                <div className={styles.checkInBtn} onClick={checkInGuest}>
                    Check in!
                </div>
            </div>
        )
    }


    return element;
}

export default ScannedGuest;
