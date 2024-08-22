
import React, { useContext, useRef } from "react";
import classes from './ContactDetails.module.css'
import AuthContext from "../AuthContext/auth-context";

const ContactDetails =() =>{
    const FullNameInputRef=useRef()
    const photoUrlInputRef= useRef()

    const authcontext=useContext(AuthContext)
    const SubmitHandler=(event)=>{
        console.log('Token',authcontext.token)
        event.preventDefault();

        const enteredFullName=FullNameInputRef.current.value;
        const enteredPhotoUrl=photoUrlInputRef.current.value;

        fetch('https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyB47KuZmw9rfYwbJbr7GlQ-i6f4Gilvnrw',{

            method: 'POST',
            body: JSON.stringify({
              idToken: authcontext.token,
              displayName: enteredFullName,
              photoUrl:enteredPhotoUrl,
              returnSecureToken: true
            }),
            headers: {
              'Content-Type': 'application/json'
            }
          })
          .then(res => {
            alert('Details upadted Succesfully')
            if (!res.ok) {
              throw new Error('Failed to update details');
            }
          })
          .catch(error => {
            console.error('Error updating details:', error);
      
          });
          }

        
    return(
        <div className={classes.div} >
        <form className={classes.form} onSubmit={SubmitHandler}>
            <h1 className={classes.heading}>Contact Details</h1>
            <label htmlFor="fullname" className={classes.label}>Full Name:</label><br/>
            <input type="text" id='fullname' required ref={FullNameInputRef} className={classes.input} ></input><br/>
            <label htmlFor="photoUrl"  className={classes.label}>Profile Photo URL:</label>
            <input type="text" id='photoUrl' required ref={photoUrlInputRef} className={classes.input}></input>

            <button type="submit" className={classes.button}>Update</button>

        </form>
        </div>

    )
}

export default ContactDetails;