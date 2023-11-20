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
    const guests = useSelector(state => state.guests.guests);

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
        console.log("guests:   ", guests);
        let checkedInGuests = guests.filter(item => item.entry);
        let plusOnes = checkedInGuests.reduce((total, item) => total + item.plusOnes, 0);
        setCheckedInPlusOnesCount(plusOnes);
        setCheckedInGuests(checkedInGuests);
    }, [guests])

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
                    label={'Guests Checked In (with Plus Ones)'} 
                    value={`${checkedInGuests.length} (${checkedInPlusOnesCount})`} 
                    className={styles.metric} />
                <Metric 
                    label={'Pending Guests'} 
                    value={+guests.length - +checkedInGuests.length} 
                    className={styles.metric} />
            </div>
        </div>
    )
}

export default Home;