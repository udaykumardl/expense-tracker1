import React,{useState} from "react";

const AuthContext=React.createContext({
    token:''
})

export const AuthContextprovider=(props) =>{
    const initialtoken=localStorage.getItem('token')
    const [retrievedData, setRetrievedData]=useState(false);
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
    }

    const contextvalue={
        token:initialtoken,
        profileData:retrievedData,
        data:updateData,
        logout:logoutHandler
    }

    return(
        <AuthContext.Provider  value={contextvalue}>
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthContext;