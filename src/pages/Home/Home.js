/* Package imports */
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

/* Component imports */
import Metric from '@/components/Metric/Metric';

/* Style imports */
import styles from './Home.scss';

/* Data imports */
import { messages } from './../../data/welcomeMsgs';

const Home = () => {
    const [currentCount, setCurrentCount] = useState(0);
    const [currentMsg, setCurrentMsg] = useState(messages[0]);
    const [checkedInGuests, setCheckedInGuests] = useState([]);
    const [checkedInPlusOnesCount, setCheckedInPlusOnesCount] = useState(0);
    const [pendingGuests, setPendingGuests] = useState([]);
    const guests = useSelector(state => state.guests.guests);
    let checkedInElement, pendingGuestsElement;

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentCount(prevCount => {
                if (prevCount === messages.length - 1) {
                    setCurrentMsg(messages[0]);
                    return 0;
                } else {
                    setCurrentMsg(messages[prevCount + 1]);
                    return prevCount + 1;
                }
            });
        }, 5000);

        return () => {
            clearInterval(interval);
        };
    }, []);

    useEffect(() => {
        let checkedInGuests = guests.filter(item => item.entry);
        let pendingGuests = guests.filter(item => !item.entry);
        let plusOnes = checkedInGuests.reduce((total, item) => total + item.plusOnesEntered, 0);
        setCheckedInPlusOnesCount(plusOnes);
        setCheckedInGuests(checkedInGuests);
        setPendingGuests(pendingGuests);
    }, [guests]);

    if(checkedInGuests.length) {
        checkedInElement = (
            <div className={styles.checkedInWrapper}>
                {
                    checkedInGuests.map((guest, index) => (
                        <div key={guest.id} className={styles.checkedInGuest}>
                            <div>{index+1}</div>
                            <div>
                                {guest.firstName} {guest.lastName} was checked in with {guest.plusOnesEntered} extra(s) by {guest.checkIn.checkedInBy} at {new Date(guest.checkIn.checkedInAt).toLocaleTimeString()}
                            </div>
                        </div>
                    ))
                }
            </div>
        )
    } else {
        checkedInElement = (
            <div className={styles.nothingToShowHere}>
                No guests have been checked-in yet.
            </div>
        )
    }

    if(pendingGuests.length) {
        pendingGuestsElement = (
            <div className={styles.pendingGuests}>
                {
                    pendingGuests.map((guest, index) => (
                        <div key={guest.id} className={styles.pendingGuest}>
                            <div>{index+1}</div>
                            <div>{guest.firstName} {guest.lastName} with {guest.plusOnes} guests</div>
                        </div>
                    ))
                }
            </div>
        )
    } else {
        pendingGuestsElement = (
            <div className={styles.nothingToShowHere}>
                All the guests have arrived! 🎉
            </div>
        )
    }

    return (
        <div className={styles.homeContainer}>
            <p className={styles.welcomeMsg}>
                { currentMsg }
            </p>

            <div className={styles.metricWrapper}>
                <Metric 
                    label={'Guests Invited'} 
                    value={guests.length} 
                    className={styles.metric} />
                <Metric 
                    label={'Guests Checked In (with Extras)'} 
                    value={`${checkedInGuests.length} (${checkedInPlusOnesCount})`} 
                    className={styles.metric} />
                <Metric 
                    label={'Pending Guests'} 
                    value={+guests.length - +checkedInGuests.length} 
                    className={styles.metric} />
            </div>

            <div className={styles.guestsCounter}>
                <div className={styles.guestsContainer}>
                    <div className={styles.checkedInContainer}>
                        <p className={styles.guestsHeader}>Guests Log</p>
                        { checkedInElement }
                    </div>
                    <div className={styles.yetToArriveCounter}>
                        <p className={styles.guestsHeader}>Yet To Arrive ({pendingGuests.length} invites)</p>
                        { pendingGuestsElement }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home;