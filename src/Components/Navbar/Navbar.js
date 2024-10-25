import React, { useContext } from 'react';
import {NavLink} from 'react-router-dom';
import classes from './Navbar.module.css'
import AuthContext from '../AuthContext/auth-context';
import { useDispatch, useSelector } from 'react-redux'
import { logOutHandler } from '../Reducers/AuthSlice'
import {changeTheme} from '../Reducers/themeSlice'


const Navbar =() =>{
    const authcontext=useContext(AuthContext);
    const logIn=useSelector(state=>state.auth.loggedIn)
    const theme=useSelector(state=>state.thememode.theme)
    const dispatch=useDispatch();
   
    const logoutHandler=()=>{
        // authcontext.logout()
        dispatch(logOutHandler())
    }

        const darkThemeHandler=()=>{
            if(theme===false){
              dispatch(changeTheme())
            }
        
        }
          const lightThemeHandler=()=>{
            if(theme===true){
              dispatch(changeTheme())
            }
        
          }
          const navClass=theme?classes.darknav:classes.nav
          const liClass=theme?classes.darkli:classes.li
          const themebuttonClass=theme?classes.darkthemebutton:classes
          const darkClass=theme?classes.darkClass:classes
        

    return (
        <div className={navClass}>
            <ul className={classes.ul}>
                <NavLink to='/'><li className={liClass}>Home</li></NavLink>
                <div className={classes.div}>
{/*                     
                    {!authcontext.logIn &&  <NavLink to='/profile'><li className={classes.li}>Profile</li></NavLink>}
                    {authcontext.logIn && <NavLink to='/login'><li className={classes.li}>Login</li></NavLink>}
                    {!authcontext.logIn && <NavLink to='/login'><li className={classes.li} onClick={logoutHandler}>Logout</li></NavLink>}
                    {!authcontext.logIn && <NavLink to='/dailyexpenses'><li className={classes.li}>Expenses</li></NavLink>}
                    {logIn &&  <NavLink to='/profile'><li className={classes.li}>Profile</li></NavLink>}
                    {!logIn &&  <NavLink to='/login'><li className={classes.li}>Login</li></NavLink>}
                    {logIn &&  <NavLink to='/login'><li className={classes.li} onClick={logoutHandler}>Logout</li></NavLink>}
                    {logIn &&  <NavLink to='/dailyexpenses'><li className={classes.li} >Expenses</li></NavLink>}  */}


                {logIn &&  <NavLink to='/profile'><li className={liClass}>Profile</li></NavLink>}
                {!logIn &&  <NavLink to='/login'><li className={liClass}>Login</li></NavLink>}
                {logIn &&  <NavLink to='/login'><li className={liClass} onClick={logoutHandler}>Logout</li></NavLink>}
                {logIn &&  <NavLink to='/dailyexpenses'><li className={liClass} >Expenses</li></NavLink>}
                <div className={themebuttonClass}>
                    <button className={darkClass} onClick={darkThemeHandler}></button>
                    <button className={classes.light} onClick={lightThemeHandler}></button>
                </div>

                </div>
            </ul>
        </div>
    )
}


export default Navbar;