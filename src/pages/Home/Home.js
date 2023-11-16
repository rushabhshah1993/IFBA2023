/* Package imports */
import React, { useEffect, useState, useRef } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import html2canvas from 'html2canvas';

import * as guestData from '@/data/guestData.json';

const Home = () => {
    // let allQRs = guestData.default.map(item => {
    //     return (
    //         <div>
    //             <p>Name:  {item.firstName} {item.lastName}</p>
    //             <QRCodeSVG value={item.link} />
    //         </div>
    //     )
    // })
    let [allQRs, setAllQRs] = useState([]);
    const qrCodeRefs = useRef([]);

    const generateQRCodes = limit => {
        let qrArr = [];
        for(let i=0; i<limit; i++) {
            qrArr.push(
                <div key={`QRCode_${i}`}>
                    <div ref={(ref) => (qrCodeRefs.current[i] = ref)}>
                        <p>Index: {i}</p>
                        <QRCodeSVG value={`https://google.com/search?q=${i}`} />
                    </div>
                   <div onClick={() => downloadQR(i)}>Download QR Code</div>
                   <hr />
                </div>
            );
        }
        setAllQRs(qrArr);
    }

    const downloadQR = (index) => {
        if(!qrCodeRefs.current[index]) {
            alert("QR Code does not exist");
            return;
        }

        html2canvas(qrCodeRefs.current[index])
        .then(canvas => {
            const qrImage = canvas.toDataURL('image/png').replace('image/png', 'image/octet-stream');
            const link = document.createElement('a');
            link.href = qrImage;
            link.download = `qrcode_${index + 1}.png`; // Adjust filename with index
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        })
        .catch((error) => {
            console.error('Error generating QR code image:', error);
        });
    }

    useEffect(() => {
        generateQRCodes(300);
    }, [])

    return (
        <div className="wrapper">
            { allQRs }
        </div>
    )
}

export default Home;