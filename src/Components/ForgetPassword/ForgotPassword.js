
import React, { useState } from "react";
import classes from './ForgotPassword.module.css'
import { useSelector } from "react-redux";


const ForgotPassword=()=>{
    const [email, setEmail]=useState('');
    const [loading,setLoading]=useState(false);

    const theme=useSelector(state=>state.thememode.theme)


    const emailChangeHandler=(event)=>{
        setEmail(event.target.value)
    }

    const submitHandler=(event)=>{
        event.preventDefault();
        setLoading(true);

        fetch('https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyB47KuZmw9rfYwbJbr7GlQ-i6f4Gilvnrw',{
            
            method:'POST',
            body:JSON.stringify({
                requestType:"PASSWORD_RESET",
                email:email,

            }),
            headers:{
                "Content-Type":"application/json",
            }
           }
          ).then((res)=>{
            setLoading(false)
            if(res.ok){
                return res.json();
            }else{
                return res.json().then((data)=>{
                    throw new Error(data.error.message);
                })
            }
          })
          .then((data) => {
            console.log("New password request sent successfully", data);
            alert("Password reset email sent! Please check your inbox.");
            setEmail('');
          })
          .catch((err) => {
            setLoading(false);
            alert(err.message);
          });

        const divClass=theme?classes.darkdiv:classes.div
        const formClass=theme?classes.darkform:classes.form
        const buttonClass=theme?classes.darkbutton:classes.button
        const labelClass=theme?classes.darklabel:classes.label
    
    return(
        <div className={divClass}>
            <form onSubmit={submitHandler}  className={formClass}>
                <label htmlFor="email" className={labelClass}>Enter Your Email</label>
                <input type='email' id='email' value={email} onChange={emailChangeHandler} className={classes.input} />

                <button type="submit" className={buttonClass}>{loading ? "Loading..." : "Forgot Password"}</button>
               
            </form>
        </div>
    )

}}

export default ForgotPassword;