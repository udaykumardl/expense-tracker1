import React, { useContext } from 'react';
import {NavLink} from 'react-router-dom';
import classes from './Navbar.module.css'
import AuthContext from '../AuthContext/auth-context';

const Navbar =() =>{
    const authcontext=useContext(AuthContext);
   
    const logoutHandler=()=>{
        authcontext.logout()
    }

    return (
        <div>
            <ul className={classes.ul}>
                <NavLink to='/'><li className={classes.li}>Home</li></NavLink>
                <div className={classes.div}>
                    
                    {!authcontext.logIn &&  <NavLink to='/profile'><li className={classes.li}>Profile</li></NavLink>}
                    {authcontext.logIn && <NavLink to='/login'><li className={classes.li}>Login</li></NavLink>}
                    {!authcontext.logIn && <NavLink to='/login'><li className={classes.li} onClick={logoutHandler}>Logout</li></NavLink>}
                    {!authcontext.logIn && <NavLink to='/dailyexpenses'><li className={classes.li}>Expenses</li></NavLink>}
                </div>
            </ul>
        </div>
    )
}

export default Navbar;