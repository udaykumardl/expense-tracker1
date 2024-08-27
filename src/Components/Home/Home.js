import React, { useContext } from "react";
import classes from './Home.module.css'
import { NavLink } from "react-router-dom";
import AuthContext from "../AuthContext/auth-context";

const Home =()=>{
    const authcontext=useContext(AuthContext)
    const profileData=localStorage.setItem('profileData')
    return(
        <div>
            <p className={classes.heading}>Welcome to Expense Tracker</p>
            {profileData?<p className={classes.p}>Your Profile is complete</p>:<p className={classes.p}>Your
                 Profile is incomplete<NavLink to='/contactdetails'>Complete Now</NavLink></p>}
            <p className={classes.p}>Want to edit the profile ? <NavLink to='/contactdetails'>Click</NavLink></p>
        </div>
    )
}
export default Home;