
import React, { useContext ,useEffect} from "react";
import AuthContext from "../AuthContext/auth-context";

const Profile =() =>{
    const authcontext=useContext(AuthContext);

    useEffect(() => {
        const storedProfileData = localStorage.getItem('profileData');
        if (storedProfileData) {
            authcontext.data(JSON.parse(storedProfileData));
        }
    }, []);

    useEffect(() => {
        fetch(
            "https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyB47KuZmw9rfYwbJbr7GlQ-i6f4Gilvnrw", 
            {
                method: "POST",
                body: JSON.stringify({
                    idToken: authcontext.token,
                }),
                headers: {
                    "content-type": "application/json",
                },
            }
        )
        .then((res) => {
            if (res.ok) {

                return res.json();
            } else {
                return res.json().then((data) => {
                    let errorMessage = "Authentication failed";
                    throw new Error(errorMessage);
                });
            }
        })
        .then((data) => {
            console.log("Fetched user data:",data.users);
            if (data && data.users) {
                const profileData = JSON.stringify(data.users);
                console.log("Storing profileData: ", profileData);
                
                localStorage.setItem('profileData', profileData); // Corrected line
                authcontext.data(data.users);
            } else {
                console.error("No valid user data found to store.");
            }
        })
        .catch((err) => {
            alert(err.message);
        });
    }, []);


    return(
        <div>
            <h1>Your Profile</h1>
            {authcontext.profileData &&authcontext.profileData.map((profile,index)=>(
             <div key={index}>
               <h3>Name:</h3>
               <p>{profile.displayName}</p>
               <h3>Email:</h3>
               <p>{profile.email}</p>
               <h3>Profile Photo:</h3>
               </div>
             ))}
                
        </div>
    )

}

export default Profile;