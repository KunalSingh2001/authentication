import { useState, useRef, useContext } from 'react';
import { AuthContext } from '../Context/AuthContext';
import classes from './AuthForm.module.css';

const AuthForm = () => {
	const [setToken] = useContext(AuthContext);
	const [isLogin, setIsLogin] = useState(true);
	const [loading, setIsLoading] = useState(false);
	const emailInputRef = useRef();
	const passwordInputRef = useRef();
	const switchAuthModeHandler = () => {
		setIsLogin((prevState) => !prevState);
	};

	function submitLoginForm(event) {
		event.preventDefault();
		setIsLoading(true);
		const enteredEmail = emailInputRef.current.value;
		const enteredPassword = passwordInputRef.current.value;
		let url;
		if (isLogin) {
			url = "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyC-EjncbSDwCk-isi9RtO3COCiSSO2mVVA";
		}else {
			url = "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyC-EjncbSDwCk-isi9RtO3COCiSSO2mVVA";
		}
		fetch(url, {
			method:"POST",
			body:JSON.stringify({
				email: enteredEmail,
				password: enteredPassword,
				returnSecureToken:true
			})
		}).then((res) => {
			if (res.ok) {
				return res.json()
			}else {
				// return res.json().then((data) => {
				// 	if (data.error.message) {
				// 		setIsLoading(false);
				// 		alert(data.error.message);
				// 	}
				// })
				throw new Error("Authentication failed!")
			}
		}).then((data) => {
			setIsLoading(false);
			setToken(data.idToken);
		}).catch((error) => {
			alert(error)
		})
		
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
					<>
						<button
							type='submit'
						>
							{isLogin ? 'Login' : 'Register'}
						</button>
						<button
							type='button'
							className={classes.toggle}
							onClick={switchAuthModeHandler}
						>
							{isLogin ? 'Create new account' : 'Login with existing account'}
						</button>
					</>
					}
				</div>
			</form>
		</section>
	);
};

export default AuthForm;
