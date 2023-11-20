/* Package imports */
import React, { useState, useEffect } from 'react';

/* Component imports */
import Metric from '@/components/Metric/Metric';

/* Style imports */
import styles from './Home.scss';

/* Data imports */
import { messages } from './../../data/welcomeMsgs';

const Home = () => {
    const [currentCount, setCurrentCount] = useState(0);
    const [currentMsg, setCurrentMsg] = useState(messages[0]);

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

    return (
        <div className={styles.homeContainer}>
            <p className={styles.welcomeMsg}>
                { currentMsg }
            </p>
        </div>
    )
}

export default Home;