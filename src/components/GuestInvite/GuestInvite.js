/* Package imports */
import React from 'react';
import { QRCodeSVG } from 'qrcode.react';

/* Style imports */
import styles from './GuestInvite.scss';

/* Image imports */
import LightsBG from '@/assets/images/lights-background.png';
import TheFBAILogo from '@/assets/images/theFBAI.png';
import TheClubLogo from '@/assets/images/the-club-logo.png';
import VikhroliCucinaLogo from '@/assets/images/vikhroli-cucina.png';
import IFBALogo from '@/assets/images/logo.png';
import GodrejRealFoodLogo from '@/assets/images/godrej-real-food.png';
import GodrejYummiez from '@/assets/images/godrej-yummiez.png';
import GodrejJersey from '@/assets/images/godrej-jersey.png';
import SoulFlowerLogo from '@/assets/images/soulflower-logo.png';
import AmarulaLogo from '@/assets/images/amarula-logo.png';
import AspriLogo from '@/assets/images/aspri-spirits.png';
import BrunettsLogo from '@/assets/images/burnetts-gin.png';
import GoldenSparrowLogo from '@/assets/images/golden-sparrow.png';
import ScottishLeaderLogo from '@/assets/images/scottish-leader.png';
import UlvukaVodkaLogo from '@/assets/images/uluvka-vodka.png';
import TioLogo from '@/assets/images/tio-logo.png';

const GuestInvite = props => {
    return (
        <div className={styles.guestInviteContainer}>
            <div className={styles.logosArea}>
                <img src={TheClubLogo} className={styles.theClubLogo} />
                <div className={styles.mainLogos}>
                    <img src={VikhroliCucinaLogo} className={styles.vikhroliCucinaLogo} />
                    <span className={styles.logoFillerText}>Presents</span>
                    <img src={IFBALogo} className={styles.ifbaLogo} />
                    <span className={styles.logoFillerText}>Powered by</span>
                    <div className={styles.poweredByLogos}>
                        <img src={GodrejRealFoodLogo} />
                        <img src={GodrejJersey} />
                        <img src={GodrejYummiez} />
                    </div>
                    <div className={styles.supportedByContainer}>
                        <span className={styles.logoFillerText}>Supported by:</span>
                        <div className={styles.supportedByLogos}>
                            <img src={SoulFlowerLogo} className={styles.soulflower} />
                            <img src={TioLogo} className={styles.tio} />
                            <img src={AspriLogo} className={styles.aspri} />
                            <img src={BrunettsLogo} className={styles.burnetts} />
                            <img src={AmarulaLogo} className={styles.amarula} />
                            <img src={UlvukaVodkaLogo} className={styles.ulvuka} />
                            <img src={GoldenSparrowLogo} className={styles.goldenSparrow} />
                            <img src={ScottishLeaderLogo} className={styles.scottishLeader} />
                        </div>
                        <span className={styles.warningText}>
                            By Invitation Only. Consumption of alcohol is permitted only with a valid liquor license.
                        </span>
                    </div>
                </div>
            </div>
            <div className={styles.inviteArea}>
                <img src={LightsBG} className={styles.lightsBg} />
                <img src={TheFBAILogo} className={styles.theFBAILogo} />
                <div className={styles.inviteText}>
                    <p className={styles.headlineText}>Invitation</p>
                    <p className={styles.mainText}>
                        You are cordially invited to
                        #IFBA2023, Indian Food & Beverage
                        Awards 2023 for Content Creators
                    </p>
                    <QRCodeSVG value={props.guest.link} />
                    <p className={styles.mainText}>
                        30th November 2023, 6.30 PM
                        onwards at The Club Mumbai,
                        The Club Courtyards - 2
                    </p>
                    <div className={styles.footerText}>
                        <p>RSVP (WhatsApp): 7506976807</p>

                        <p>#IFBA2023</p>
                        <p>@foodbloggerai</p>
                        <p>@vikhrolicucina</p>
                        <p>@theclubmumbai</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default GuestInvite;