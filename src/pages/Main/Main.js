/* Package imports */
import React, { useEffect, useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import { QRCodeSVG } from 'qrcode.react';
import html2canvas from 'html2canvas';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

/* Style imports */
import styles from './Main.scss';

/* Image imports */
import IFBALogo from '@/assets/images/logo.png';


const Main = () => {
    /* Store data variables */
    const originalGuests = useSelector(state => state.guests.guests);

    /* Local state variables */
    const [allQRs, setAllQRs] = useState([]);
    const [originalQRs, setOriginalQRs] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [guests, setGuests] = useState([]);
    
    /* Reference variables */
    const qrCodeRefs = useRef([]);
    
    /* Element variables */
    let tableHeaders = null;
    let searchContainer = null;



    /* Essential Functions */
    const generateQRCodes = () => {
        let qrArr = originalGuests.map((guest, index) => {
            return (
                <React.Fragment key={`${guest.id}_${guest.firstName}_${guest.lastName}`}>
                    <div className={styles.guestRow}>
                        <div># {index+1}</div>
                        <div className={styles.guestInfo}>
                            <p className={styles.name}>{guest.firstName} {guest.lastName}</p>
                            <p className={styles.email}>{guest.email}</p>
                            <p className={styles.phone}>{guest.number}</p>
                        </div>
                        <div className={styles.comments}>
                            {guest.comments}
                        </div>
                        <div className={styles.qrColumn}>
                            <QRCodeSVG value={`https://google.com/search?q=${index}`} />
                            <div onClick={() => downloadQR(index, guest)} className={styles.downloadBtn}>
                                Download QR Code
                            </div>
                        </div>
                    </div>
                    <div className={styles.downloadCard} ref={(ref) => (qrCodeRefs.current[index] = ref)}>
                        <img src={IFBALogo} className={styles.logoContainer} />
                        <div className={styles.content}>
                            <p>Dear {guest.firstName} {guest.lastName},</p>
                            <p>
                                You are graciously invited to the annual edition of the
                                Indian Food Bloggers' Award 2023. This year the function will
                                be hosted at The Club, Andheri West on November 30, 2023 at 
                                7 PM.

                                Kindly scan the QR code given below at the entrance. Our 
                                hardworking team will be there to assist you.
                            </p>
                        </div>
                        <QRCodeSVG value={`https://google.com/search?q=${index}`} />
                    </div>
                </React.Fragment>
            )
        });
        setOriginalQRs(qrArr);
        setAllQRs(qrArr);
    }

    const downloadQR = (index, guest) => {
        if(!qrCodeRefs.current[index]) {
            alert("QR Code does not exist");
            return;
        }

        let downloadTemplate = qrCodeRefs.current[index];
        downloadTemplate.style.display = 'flex';

        html2canvas(qrCodeRefs.current[index])
        .then(canvas => {
            const qrImage = canvas.toDataURL('image/png').replace('image/png', 'image/octet-stream');
            const link = document.createElement('a');
            link.href = qrImage;
            link.download = `${guest.firstName} ${guest.lastName} - IFBA'23 Invitation.png`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        })
        .catch((error) => {
            console.error('Error generating QR code image:', error);
        });

        setTimeout(() => {
            downloadTemplate.style.display = 'none';
        }, 5000);
    }

    const searchHandler = (event) => {
        setSearchTerm(event.target.value);
        if(event.target.value.length === 0) {
            setAllQRs(originalQRs);
            return;
        }
        let filteredQRs = allQRs.filter(element => {
            return element.key.includes(event.target.value);
        })
        setAllQRs(filteredQRs);
    }

    const addGuestBtnClickHandler = () => {
        window.location.assign('/add-guests');
    }



    /* Effect hooks */
    useEffect(() => {
        if(originalGuests && originalGuests.length) {
            setGuests(originalGuests);
            generateQRCodes();
        }
    }, [originalGuests]);

    


    /* Element creations */
    if(guests && guests.length) {
        tableHeaders = (
            <div className={styles.tableHeaders}>
                <div>Sr. No.</div>
                <div>Contact Information</div>
                <div>Comments</div>
                <div>QR Code</div>
                <div></div>
            </div>
        );

    }
    if(originalGuests && originalGuests.length) {
        searchContainer = (
            <div className={styles.searchContainer}>
                <input 
                    type="text" 
                    onChange={searchHandler} 
                    value={searchTerm}
                    placeholder={'Search guests by first name'}
                    className={styles.search} />
                <FontAwesomeIcon icon="search" className={styles.searchIcon} />
            </div>
        );
    }
    
    return (
        <div className={styles.wrapper}>
            <div className={styles.header}>
                <p className={styles.title}>GUESTS LIST</p>
                <div className={styles.btn} onClick={addGuestBtnClickHandler}>
                    <FontAwesomeIcon icon="user-plus" className={styles.addGuestIcon} />
                    <span>Add Guest(s)</span>
                </div>
            </div>
            { searchContainer }
            { tableHeaders }
            { allQRs }
        </div>
    )
}

export default Main;
