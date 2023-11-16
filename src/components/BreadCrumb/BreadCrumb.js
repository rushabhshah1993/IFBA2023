/* Package imports */
import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';

/* Style imports */
import styles from './BreadCrumb.scss';

/* Image imports */
import IFBALogo from '@/assets/images/logo.png';

const BreadCrumb = () => {
    return (
        <div>
            <nav className={styles.breadcrumb}>
                <div className={styles.logoContainer}>
                    <img src={IFBALogo} />
                </div>
                <div className={styles.navList}>
                    <NavLink to="/" className={({ isActive }) => {return isActive ? styles.active : ''}}>
                        Home
                    </NavLink>
                    <NavLink to="/code" className={({ isActive }) => {return isActive ? styles.active : ''}}>
                        QR Codes
                    </NavLink>
                </div>
            </nav>
            <Outlet />
        </div>
    )
}

export default BreadCrumb;
