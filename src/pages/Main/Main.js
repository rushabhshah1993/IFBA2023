/* Package imports */
import React, { useEffect, useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import { QRCodeSVG } from 'qrcode.react';
import html2canvas from 'html2canvas';

/* Style imports */
import styles from './Main.scss';

/* Image imports */
import IFBALogo from '@/assets/images/logo.png';


const Main = () => {
    const [allQRs, setAllQRs] = useState([]);
    const guests = useSelector(state => state.guests.guests);
    const qrCodeRefs = useRef([]);

    console.log("guests:   ", guests);

    const generateQRCodes = () => {
        let qrArr = guests.map((guest, index) => {
            return (
                <React.Fragment key={guest.id}>
                    <div className={styles.guestRow}>
                        <p># {index+1}</p>
                        <div>
                            <p>{guest.firstName} {guest.lastName}</p>
                            <p>{guest.email}</p>
                            <p>{guest.number}</p>
                        </div>
                        <div className={styles.comments}>
                            {guest.comments}
                        </div>
                        <div>
                            <QRCodeSVG value={`https://google.com/search?q=${index}`} />
                        </div>
                        <div onClick={() => downloadQR(index, guest)} className={styles.downloadBtn}>
                            Download QR Code
                        </div>
                    </div>
                    <div className={styles.downloadCard} ref={(ref) => (qrCodeRefs.current[index] = ref)}>
                        <img src={IFBALogo} className={styles.logoContainer} />
                        <div>
                            <p>Dear {guest.firstName} {guest.lastName},</p>
                            <p>
                                You are graciously invited to the annual edition of the
                                Indian Food Bloggers' Award 2023. This year the function will
                                be hosted at The Club, Andheri West on November 30, 2023 at 
                                7 PM.

                                Kindly scan the QR code given below at the entrance. Our 
                                hardworking team will be there to assist you.
                            </p>
                            <QRCodeSVG value={`https://google.com/search?q=${index}`} />
                        </div>
                    </div>
                </React.Fragment>
            )
        });
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

    useEffect(() => {
        if(guests && guests.length) {
            generateQRCodes();
        }
    }, [guests]);

    return (
        <div className="wrapper">
            <p className={styles.title}>Generated QR Codes</p>
            { allQRs }
        </div>
    )
}

export default Main;
