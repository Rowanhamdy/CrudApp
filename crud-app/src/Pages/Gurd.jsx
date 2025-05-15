import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux';

export default function Gurd({children}) {
    const navigate = useNavigate()
    const {isLoggedIn} = useSelector((state) => state.auth);

    useEffect(() =>{
        if(!isLoggedIn){
            // Redirect to login if not logged in
            navigate("/auth")
        }
    } , [isLoggedIn , navigate])
  return children
}
