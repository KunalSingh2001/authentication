import React, { useRef, useContext } from 'react';
import classes from './ProfileForm.module.css';
import { AuthContext } from '../Context/AuthContext';
import { useHistory } from 'react-router-dom';
const ProfileForm = () => {
    const { token } = useContext(AuthContext);
    const newPasswordInputRef = useRef("");
    const history = useHistory()
    function formSubmitHander(event) {
        event.preventDefault();
        let enteredEmail = newPasswordInputRef.current.value;
        fetch("https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyC-EjncbSDwCk-isi9RtO3COCiSSO2mVVA", {
            method: "POST",
            body: JSON.stringify({
                idToken: token,
                password: enteredEmail,
                returnSecureToken: false
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((res) => {
            console.log("Raw response:", res);
            if (res.ok) {
                return res.json();
            } else {
                return res.json().then((data) => {
                    console.log("Error response:", data);
                    throw new Error("Authentication failed!");
                });
            }
        })
            .then((data) => {
                console.log("Success data:", data);
                history.replace("/");
            })
            .catch((error) => {
                alert(error.message);
            });
    }

    return (
        <form className={classes.form} onSubmit={formSubmitHander}>
            <div className={classes.control}>
                <label htmlFor='new-password'>New Password</label>
                <input type='password' id='new-password' minLength="7" ref={newPasswordInputRef} />
            </div>
            <div className={classes.action}>
                <button>Change Password</button>
            </div>
        </form>
    );
}

export default ProfileForm;
