/* Package imports */
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import cloneDeep from 'lodash/cloneDeep';

/* Component imports */
import Modal from '@/components/Modal/Modal';

/* Style imports */
import styles from './ScannedGuest.scss';
import isEmpty from 'lodash/isEmpty';

/* Image imports */
import IFBALogo from '@/assets/images/logo.png';

/* Store imports */
import { updateGuestEntry } from '@/store/slices/guestSlice';


const ScannedGuest = props => {
    /* Global store data fetch */
    const allGuests = useSelector(state => state.guests.guests);
    const admins = useSelector(state => state.members.members);
    
    /* Local state */
    const [guestData, setGuestData] = useState({});
    const [extrasCount, setExtrasCount] = useState(1);
    const [addMoreExtras, setAddMoreExtras] = useState(false);
    const [selectedAdmin, selectAdmin] = useState(null);
    const [additionalComment, setAdditionalComment] = useState('');
    const [disabledSubmit, disableSubmit] = useState(true);
    
    /* Set up location and dispatch */
    const location = useLocation();
    const dispatch = useDispatch();
    
    /* Elements initialisations */
    let element = null;
    let adminElement = null;
    let submitClassNames = [styles.checkInBtn];

    /* Location-based initialisations */
    const searchParams = queryStringToObject(location.search);



    /* Effects */
    useEffect(() => {
        let guest = allGuests.find(guest => guest.id === +searchParams.id);
        if(!isEmpty(guest)) setGuestData(guest);
    }, [!isEmpty(searchParams), allGuests.length]);

    useEffect(() => {
        if(selectedAdmin !== null) {
            disableSubmit(false);
        }
    }, [selectedAdmin])



    /* Functions and handlers */
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
        let updatedGuests = cloneDeep(allGuests);
        for(let guest of updatedGuests) {
            if(guest.id === +searchParams.id) {
                if(extrasCount) guest.plusOnesEntered = +extrasCount;
                if(additionalComment.length) guest.comments += `\n Entry comments: ${additionalComment}`;
                guest.checkIn.checkedInBy = selectedAdmin;
                guest.checkIn.checkedInAt = new Date().toISOString();
                guest.entry = true;
                break;
            }
        }
        let request = dispatch(updateGuestEntry(updatedGuests));
        request.then(() => {
            alert(`${guestData.firstName} ${guestData.lastName} has been successfully checked in!`);
            window.location.assign('/');
        })
        .catch(error => {
            console.error("Error in updating guest entry:  ", entry);
            alert(`There has been a failure in adding ${firstName} ${lastName} to the database. Kindly connect with Rushabh.`);
        })
    }




    /* Elements */
    if(admins.length) {
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

    if(disabledSubmit) {
        submitClassNames.push(styles.disabledBtn);
    }

    if(!isEmpty(guestData)) {
        element = (
            <div className={styles.scannedGuestContainer}>
                <div className={styles.logoContainer}>
                    <img src={IFBALogo} />
                </div>

                <p className={styles.guestName}>
                    {
                        guestData.entry ?
                        `${guestData.firstName} ${guestData.lastName} was checked in by ${guestData.checkIn.checkedInBy} on ${new Date(guestData.checkIn.checkedInAt)}`:
                        `You are checking in ${guestData.firstName} ${guestData.lastName}`
                    }
                </p>

                {
                    guestData.entry ?
                    (
                        <p>
                            {guestData.firstName} arrived with {guestData.plusOnes} registered guest(s) 
                            {
                                guestData.plusOnesEntered ?
                                ` and ${guestData.plusOnesEntered} additional guest(s) on entry.` :
                                '.'
                            }
                        </p>
                    ) :
                    (
                        <p>
                            {
                                guestData.plusOnes > 0 ?
                                `${guestData.firstName} should be accompanied by ${guestData.plusOnes} guests` :
                                `${guestData.firstName} should have arrived alone` 
                            }
                        </p>
                    )
                }

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

                    {
                        !guestData.entry ?
                        (
                            <textarea 
                                value={additionalComment} 
                                onChange={(event) => setAdditionalComment(event.target.value)}
                                placeholder={'Add additional comments'}
                                rows={5} /> 
                        ):
                        null
                    }

                    {
                        !guestData.entry ?
                        (
                            <div className={styles.checkboxContainer}>
                                <input 
                                    type={'checkbox'} 
                                    value={addMoreExtras} 
                                    onChange={() => setAddMoreExtras(!addMoreExtras)} />
                                <span>Do you need to check in more guests?</span>
                            </div>
                        ) :
                        null
                    }

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

                    {
                        !guestData.entry ?
                        (    
                            <div className={styles.checkedInByContainer}>
                                <p>Checked in by:</p>
                                { adminElement }
                            </div>
                        ) : 
                        null
                    }
                </div>

                {
                    !guestData.entry ?
                    (
                        <div className={submitClassNames.join(' ')} onClick={checkInGuest}>
                            <FontAwesomeIcon icon="user-check" className={styles.userCheckIcon} />
                            <span>Check in!</span>
                        </div>
                    ) :
                    null
                }
            </div>
        )
    } else {
        element = (
            <Modal>
                <FontAwesomeIcon 
                    icon="spinner" 
                    spin 
                    className={styles.loader}
                    style={{ marginRight: '8px' }}
                    size={'3x'}/>
                <span>Loading guest data...</span>
            </Modal> 
        )
    }


    return element;
}

export default ScannedGuest;
