
import React, { useContext, useRef } from "react";
import classes from './ContactDetails.module.css'
// import AuthContext from "../AuthContext/auth-context";
import {useSelector, useDispatch} from 'react-redux'

const ContactDetails =() =>{
    const token=useSelector(state=>state.auth.token)
    const FullNameInputRef=useRef()
    const photoUrlInputRef= useRef()
    const theme=useSelector(state=>state.thememode.theme)

    // const authcontext=useContext(AuthContext)
    const SubmitHandler=(event)=>{
        console.log('Token',token)
        event.preventDefault();
        console('theme',theme)

        const enteredFullName=FullNameInputRef.current.value;
        const enteredPhotoUrl=photoUrlInputRef.current.value;

        fetch('https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyB47KuZmw9rfYwbJbr7GlQ-i6f4Gilvnrw',{

            method: 'POST',
            body: JSON.stringify({
              idToken: token,
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

          const formClass =theme ? classes.darkform :classes.from;
          const buttonClass= theme ?classes.darkbutton:classes.button;
          const headingClass = theme ? classes.darkheading : classes.heading;
          const divClass = theme ? classes.darkdiv : classes.div;
          const labelClass=theme ? classes.darklabel :classes.label

        
    return(
        <div className={divClass} >
        <form className={formClass} onSubmit={SubmitHandler}>
            <h1 className={headingClass}>Contact Details</h1>
            <label htmlFor="fullname" className={labelClass}>Full Name:</label><br/>
            <input type="text" id='fullname' required ref={FullNameInputRef} className={classes.input} placeholder="enter fullname"></input><br/>
            <label htmlFor="photoUrl"  className={classes.label}>Profile Photo URL:</label>
            <input type="text" id='photoUrl' required ref={photoUrlInputRef} className={classes.input} placeholder="enter url"></input>

            <button type="submit" className={buttonClass}>Update</button>

        </form>
        </div>

    )
}

export default ContactDetails;