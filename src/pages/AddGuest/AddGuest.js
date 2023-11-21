/* Package imports */
import React from 'react';

/* Style imports */
import styles from './AddGuest.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const AddGuest = () => {
    const onBackClickHandler = () => {
        window.location.assign('/guests');
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
        </div>
    )
}

export default AddGuest;
