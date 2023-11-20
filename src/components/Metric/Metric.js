/* Package imports */
import React from 'react';

/* Style imports */
import styles from './Metric.scss';

const Metric = props => {
    let element = null;

    if(props.label) {
        return (
            <div className={[styles.metricContainer, props.className].join(' ')}>
                <p className={styles.metricLabel}>{props.label}</p>
                <p className={styles.metricValue}>
                    {(props.value !== undefined && props.value !== null && props.value !== '') ? props.value : '-'}
                </p>
            </div>
        )
    }

    return element;
}

export default Metric;