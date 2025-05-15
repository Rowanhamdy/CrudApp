import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { authActions } from "../Store/authSlice";

export default function LogOut() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  

  useEffect(() =>{
    dispatch(authActions.logout())
    navigate("/login")
  })

  return (
    <>
      <div className="backgound ">
      <div className="text-center mt-5">
      <h3>Logging you out...</h3>
    </div>
      </div>
    </>
  );
}
