/* Package imports */
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

/* Style imports */
import styles from './Login.scss';

/* Image imports */
import IFBALogo from '@/assets/images/logo.png';

/* Store imports */
import { checkIfUserAuthenticated } from '@/store/slices/userSlice';

const Login = () => {
    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [viewPassword, setPasswordVisibility] = useState(false);
    const dispatch = useDispatch();

    const usernameChangeHandler = event => {
        setUserName(event.target.value);
    }

    const passwordChangeHandler = event => {
        setPassword(event.target.value);
    }

    const loginClickHandler = () => {
        let userAuthenticated = dispatch(checkIfUserAuthenticated(username, password));
        userAuthenticated.then(response => {
            console.log("response:   ", response);
        })
        .catch(error => {
            console.log("Error in authenticating the user:   ", error);
        })
    }

    const changePasswordVisibility = () => {
        setPasswordVisibility(!viewPassword);
    }

    let btnClassNames = [styles.loginBtn];
    if(username.length && password.length) {
        btnClassNames.push(styles.activeBtn);
    } else {
        btnClassNames = btnClassNames.filter(item => item !== styles.activeBtn);
    }

    return (
        <div className={styles.loginContainer}>
            <div className={styles.logoContainer}>
                <img src={IFBALogo} />
            </div>
            <input 
                type="name" 
                onChange={usernameChangeHandler}
                placeholder='Username' 
                value={username} />
            <div className={styles.passwordContainer}>
                <input 
                    type={viewPassword ? 'text' : 'password'}
                    onChange={passwordChangeHandler} 
                    placeholder='Password'
                    value={password} />
                <FontAwesomeIcon 
                    className={styles.passwordIcon}
                    icon={viewPassword ? 'eye' : 'eye-slash'}
                    onClick={changePasswordVisibility} />
            </div>
            <div className={btnClassNames.join(' ')} onClick={loginClickHandler}>
                Log In
            </div>
        </div>
    )
}

export default Login;
