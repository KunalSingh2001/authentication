import { useState, useRef } from 'react';

import classes from './AuthForm.module.css';

const AuthForm = () => {
	const [isLogin, setIsLogin] = useState(true);
	const [loading, setIsLoading] = useState(false);
	const emailInputRef = useRef();
	const passwordInputRef = useRef();
	const switchAuthModeHandler = () => {
		setIsLogin((prevState) => !prevState);
	};

	function submitLoginForm(event) {
		event.preventDefault()
		// setIsLoading(true);
		const enteredEmail = emailInputRef.current.value;
		const enteredPassword = passwordInputRef.current.value;
		if (isLogin) {

		}else {
			fetch("https://identitytoolkit.googleapis.com/v1/accounts:signInWithCustomToken?key=AIzaSyC-EjncbSDwCk-isi9RtO3COCiSSO2mVVA", {
				method: "POST",
				body: JSON.stringify({
					email: enteredEmail,
					password: enteredPassword,
					returnSecureToken:true
				}),
				headers: {
					'Content-Type': 'application/json'
				}
			})
		}
	}

	return (
		<section className={classes.auth}>
			<h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
			<form onSubmit={submitLoginForm}>
				<div className={classes.control}>
					<label htmlFor='email'>Your Email</label>
					<input type='email' id='email' required ref={emailInputRef}/>
				</div>
				<div className={classes.control}>
					<label htmlFor='password'>Your Password</label>
					<input
						type='password'
						id='password'
						required
						ref={passwordInputRef}
					/>
				</div>
				<div className={classes.actions}>
					{loading ? <p>Sending request...</p> :
						<button
							type='button'
							className={classes.toggle}
							onClick={switchAuthModeHandler}
						>
							{isLogin ? 'Create new account' : 'Login with existing account'}
						</button>
					}
				</div>
			</form>
		</section>
	);
};

export default AuthForm;
