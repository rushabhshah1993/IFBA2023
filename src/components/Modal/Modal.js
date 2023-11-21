/* Package imports */
import React from 'react';

/* Style imports */
import styles from './Modal.scss'; 

const Modal = ({ onClose, children }) => {
    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modal}>
                <button className={styles.closeBtn} onClick={onClose}>
                    Close
                </button>
                {children}
            </div>
        </div>
    );
};

export default Modal;
