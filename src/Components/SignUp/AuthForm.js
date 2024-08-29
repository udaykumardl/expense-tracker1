import React, { useContext, useRef, useState } from 'react'
import classes from './AuthForm.module.css'
import {useNavigate} from 'react-router'
import { NavLink } from 'react-router-dom';
import AuthContext from '../AuthContext/auth-context';

const SignUp = () => {
    const emailInputRef=useRef();
    const passwordInputRef=useRef();
    const confirmPasswordInputRef=useRef();
    const authcontext=useContext(AuthContext);

    const [logIn,setLogIn]=useState(false);

    const navigate=useNavigate()

    const switchAuthModeHandler=()=>{
      setLogIn(prevState=>!(prevState))
    }

    const SubmitHandler = (event) => {
      event.preventDefault();
  
      if (!emailInputRef.current || !passwordInputRef.current || (!logIn && !confirmPasswordInputRef.current)) {
          alert('One or more input fields are missing.');
          return;
      }
  
      const enteredEmail = emailInputRef.current.value;
      const enteredPassword = passwordInputRef.current.value;
  
      if (logIn) {
          fetch('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyB47KuZmw9rfYwbJbr7GlQ-i6f4Gilvnrw', {
              method: 'POST',
              body: JSON.stringify({
                  email: enteredEmail,
                  password: enteredPassword,
                  returnSecureToken: true,
              }),
              headers: {
                  'Content-Type': 'application/json'
              }
          })
          .then(res => {
              if (res.ok) {
                  return res.json();
              } else {
                  return res.json().then((data) => {
                      let errorMessage = 'Authentication Failed!';
                      if (data && data.error.message) {
                          errorMessage = data.error.message;
                      }
                      alert(errorMessage);
                      throw new Error(errorMessage);
                  });
              }
          })
          .then((data) => {
              navigate('/dailyexpenses');
              const idToken = data.idToken;
              localStorage.setItem('token', idToken);
              authcontext.logInHandler();
          })
          .catch((err) => {
              alert(err.message);
          });
  
      } else {
          const enteredConfirmPassword = confirmPasswordInputRef.current.value;
  
          if (enteredPassword !== enteredConfirmPassword) {
              alert('Passwords do not match!');
              return;
          }
  
          fetch('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyB47KuZmw9rfYwbJbr7GlQ-i6f4Gilvnrw', {
              method: 'POST',
              body: JSON.stringify({
                  email: enteredEmail,
                  password: enteredPassword,
                  returnSecureToken: true
              }),
              headers: {
                  'Content-Type': 'application/json'
              }
          })
          .then(res => {
              if (res.ok) {
                  console.log('User has successfully signed up.');
              } else {
                  return res.json().then((data) => {
                      let errorMessage = "Authentication Failed!";
                      if (data && data.error.message) {
                          errorMessage = data.error.message;
                      }
                      alert(errorMessage);
                  });
              }
          })
          .catch(error => {
              console.error('Error during sign up:', error);
  
              passwordInputRef.current.value = '';
              confirmPasswordInputRef.current.value = '';
          });
      }
  };
  


  return (
    <div className={classes.div}>
    <form className={classes.form} onSubmit={SubmitHandler}>
        <h1 className={classes.heading}>{logIn?'LogIn':'Sign Up'}</h1>
        <label htmlFor="email" className={classes.label}>Email:</label><br/>
        <input type="email" placeholder='Email' id='email' className={classes.input} ref={emailInputRef} required/><br/>
        <label htmlFor="password" className={classes.label}>Password:</label><br/>
        <input type="password" placeholder='Password' id='password' className={classes.input} ref={passwordInputRef} required/><br/>
        {!logIn && (<><label htmlFor="Confirmpassword" className={classes.label}>Confirm Password:</label><br/>
        <input type="password" placeholder='Confirm Password' id='Confirmpassword' className={classes.input} ref={confirmPasswordInputRef} required/><br/></> )}
        <button className={classes.button}>{logIn ? 'LogIn':'Create New Account'}</button>  
        {logIn && <NavLink to='/forgotpassword'><p>Forget Password</p></NavLink>}
        <p className={classes.p} onClick={switchAuthModeHandler}>{logIn?"New User?Sign up":'Login with existing account'}</p>

    </form>
    </div>
  )
}

export default SignUp;