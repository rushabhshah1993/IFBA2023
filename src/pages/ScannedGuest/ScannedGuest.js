/* Package imports */
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

/* Style imports */
import styles from './ScannedGuest.scss';
import isEmpty from 'lodash/isEmpty';

/* Image imports */
import IFBALogo from '@/assets/images/logo.png';


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
        
        let allAdmins = admins.map((admin) => {
            let classNames = [styles.admin];
            if(selectedAdmin == admin.name) classNames.push(styles.activeAdmin);
            return (
                <div 
                    className={classNames.join(' ')}
                    key={admin.id} 
                    onClick={() => selectAdmin(admin.name)}>
                    { admin.name }
                </div>
            )
        })
        adminElement = (
            <div className={styles.adminsContainer}>
                { allAdmins }
            </div>
        )
    }


    if(guestData) {
        element = (
            <div className={styles.scannedGuestContainer}>
                <div className={styles.logoContainer}>
                    <img src={IFBALogo} />
                </div>

                <p className={styles.guestName}>
                    You are checking in {guestData.firstName} {guestData.lastName}
                </p>

                <p>
                    {
                        guestData.plusOnes > 0 ?
                        `${guestData.firstName} should be accompanied by ${guestData.plusOnes} guests` :
                        `${guestData.firstName} should have arrived alone` 
                    }
                </p>

                <p>Additional Information</p>
                <div className={styles.otherInfo}>                    
                    {
                        guestData.id ?
                        <span className={styles.infoElement}>Guest ID: {guestData.id}</span> :
                        null
                    }
                    {
                        guestData.email ?
                        <span className={styles.infoElement}>Email: {guestData.email}</span> :
                        null
                    }
                    {
                        guestData.phone ?
                        <span className={styles.infoElement}>Phone Number: {guestData.phone}</span> :
                        null
                    }
                    {
                        guestData.comments && guestData.comments.length > 0 && guestData.comments !== "-" ?
                        (
                            <div className={styles.commentsContainer}>
                                <span>Comments: </span>
                                <div className={styles.comments}>{ guestData.comments }</div>
                            </div>
                        ) :
                        null
                    }

                    <div className={styles.checkboxContainer}>
                        <input 
                            type={'checkbox'} 
                            value={addMoreExtras} 
                            onChange={() => setAddMoreExtras(!addMoreExtras)} />
                        <span>Do you need to check in more guests?</span>
                    </div>

                    {
                        addMoreExtras ?
                        (
                            <div className={styles.extraGuestsContainer}>
                                <label>Additional Guests: </label>
                                <input 
                                    type={'number'} 
                                    value={extrasCount} 
                                    onChange={extrasChangeHandler}
                                    placeholder={'Add count of additional guests'} />     
                            </div>
                        ) :
                        null
                    }

                    <div className={styles.checkedInByContainer}>
                        <p>Checked in by:</p>
                        { adminElement }
                    </div>
                </div>

                <div className={styles.checkInBtn} onClick={checkInGuest}>
                    <FontAwesomeIcon icon="user-check" className={styles.userCheckIcon} />
                    <span>Check in!</span>
                </div>
            </div>
        )
    }


    return element;
}

export default ScannedGuest;
