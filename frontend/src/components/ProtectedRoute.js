import { useContext, useEffect } from "react"
import { AuthContext } from "../context/AuthContext"
import { Navigate, Outlet, useLocation } from "react-router-dom"

const ProtectedRoute = () => {
    const {loggedIn,logout} = useContext(AuthContext)
    const location = useLocation()

    function isTokenExpired(){
        const expiry = localStorage.getItem('tokenExpiry')
        return !expiry || Date.now() > parseInt(expiry,10)
    }
    const shouldLogout = isTokenExpired() || !loggedIn

    useEffect(()=>{
        if(shouldLogout){
            logout()
        }
    },[shouldLogout,logout])
    if(shouldLogout){
        return <Navigate to={'/login'} replace state={{from:location}} />
    }
    return <Outlet/>
}

export default ProtectedRoute
