import React,{useState} from "react";

const AuthContext=React.createContext({
    token:''
})

export const AuthContextprovider=(props) =>{
    const initialtoken=localStorage.getItem('token')
    const [retrievedData, setRetrievedData]=useState(false);
    const [loggedIn,setLoggedIn]=useState(true);
    console.log('initialtoken',initialtoken)

    const updateData=(data)=>{
        setRetrievedData(data)
        console.log('Retrieved Data',data)
        console.log('UseState Data',data)
    }
    const logoutHandler=()=>{
        localStorage.removeItem('token');
        localStorage.removeItem('email');
        localStorage.removeItem('profileData')
        setLoggedIn(prevstate=>!prevstate)
        console.log('logout',loggedIn)
    }
    const logInHandler=()=>{
        setLoggedIn(prevstate=>!prevstate)
        console.log('login',loggedIn)

    }

    const contextvalue={
        token:initialtoken,
        profileData:retrievedData,
        data:updateData,
        logout:logoutHandler,
        logInHandler:logInHandler,
        logIn:loggedIn
    }

    return(
        <AuthContext.Provider  value={contextvalue}>
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthContext;

