/* Package imports */
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

/* Style imports */
import styles from './AddGuest.scss';

/* Store imports */
import { addGuestToDatabase } from '@/store/slices/guestSlice';

const AddGuest = () => {
    const guests = useSelector(state => state.guests.guests);

    const dispatch = useDispatch();

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [plusOnes, setPlusOnes] = useState(0);
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [comments, setComments] = useState('');
    const [disabled, setDisabled] = useState(false);


    const onBackClickHandler = () => {
        window.location.assign('/guests');
    }

    const submitBtnHandler = () => {
        setDisabled(true);

        let finalGuestInfo = {
            firstName: firstName,
            lastName: lastName,
            plusOnes: +plusOnes,
            email: email,
            phone: phone,
            comments: comments,
            link: `https://www.google.com/search?q=${firstName}%20${lastName}`,
            id: guests.length + 1,
            plusOnesEntered: 0,
            entry: false,
            checkIn: {
                checkedInBy: "",
                checkedInAt: ""
            }
        }

        let addRequest = dispatch(addGuestToDatabase(finalGuestInfo));
        addRequest.then(response => {
            if(response) {
                let addMoreGuests = confirm(`Guest ${firstName} ${lastName} has been added successfully to the database. Do you wish to add more guests?`);
                if(addMoreGuests) resetForm();
                else {
                    resetForm();
                    window.location.assign('/');
                }
            }
        })
        .catch(error => {
            console.error("Error in adding guest:   ", error);
            alert(`There has been a failure in adding ${firstName} ${lastName} to the database. Kindly connect with Rushabh.`);
        })
        .finally(() => {
            setDisabled(false);
        })
    }

    const resetForm = () => {
        setFirstName('');
        setLastName('');
        setPhone('');
        setEmail('');
        setPlusOnes(0);
        setComments('');
    }


    return (
        <div className={styles.addGuestContainer}>
            <div className={styles.header}>
                <p className={styles.pageTitle}>Add Guest(s)</p>
                <div className={styles.backBtn} onClick={onBackClickHandler}>
                    <FontAwesomeIcon icon="chevron-left" className={styles.leftIcon} />
                    <span>Back to Guests</span>
                </div>
            </div>

            <div className={styles.mainForm}>
                <div className={styles.nameInputs}>
                    <div className={styles.formElement}>
                        <label>First Name</label>
                        <input 
                            type={'text'}
                            placeholder={'Enter the first name of the guest'}
                            value={firstName}
                            disabled={disabled}
                            onChange={(event) => setFirstName(event.target.value)} />
                    </div>
                    <div className={styles.formElement}>
                        <label>Last Name</label>
                        <input
                            type={'text'}
                            placeholder={'Enter the last name of the guest'}
                            value={lastName}
                            disabled={disabled}
                            onChange={(event) => setLastName(event.target.value)} />
                    </div>
                </div>

                <div className={styles.formElement}>
                    <label>Extras?</label>
                    <input 
                        type={'number'} 
                        min={0}
                        max={5}
                        placeholder={'Enter the number of extras the guests will be accompanied with'}
                        value={plusOnes}
                        disabled={disabled}
                        onChange={(event) => setPlusOnes(event.target.value)}/>
                </div>

                <div className={styles.formElement}>
                    <label>Email</label>
                    <input 
                        type={'email'}
                        placeholder={'Enter the email address of the guest'}
                        value={email}
                        disabled={disabled}
                        onChange={(event) => setEmail(event.target.value)} />
                </div>

                <div className={styles.formElement}>
                    <label>Phone Number</label>
                    <input 
                        type={'tel'} 
                        placeholder={'Enter the mobile number of the guest'}
                        value={phone}
                        disabled={disabled}
                        onChange={(event) => setPhone(event.target.value)} />
                </div>

                <div className={styles.formElement}>
                    <label>Comments</label>
                    <textarea 
                        rows={5}
                        placeholder={'Add any comments related to the guests, e.g. "The guest is the head chef of ITC Maratha"'}
                        value={comments}
                        disabled={disabled}
                        onChange={(event) => setComments(event.target.value)} />
                </div>

                <div className={styles.submitBtn} onClick={submitBtnHandler}>
                    Add Guest
                </div>
            </div>
        </div>
    )
}

export default AddGuest;
