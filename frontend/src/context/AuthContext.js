import { createContext, useEffect, useMemo, useState } from "react";

export const AuthContext = createContext(null);

const AuthProvider = ({children}) => {
    const [loggedIn,setLoggedIn] = useState(()=> !!localStorage.getItem("accessToken"));
    const [user,setUser] = useState(()=>{
        const raw = localStorage.getItem("user");
        return raw? JSON.parse(raw):null;
    });
    
    useEffect(()=>{
        if(user){
            localStorage.setItem("user",JSON.stringify(user));
        }else{
            localStorage.removeItem("user")
        }
    },[user]);

    const logout = () =>{
        localStorage.removeItem("user");
        localStorage.removeItem("accessToken");
        localStorage.removeItem("tokenExpiry")
        setLoggedIn(t=>false);
        setUser(null);
      }

    const value = useMemo(() => ({
        loggedIn,
        setLoggedIn,
        user,
        setUser,
        logout
    }), [loggedIn, user]);


  return (
    <AuthContext.Provider value={value}>
        {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider
