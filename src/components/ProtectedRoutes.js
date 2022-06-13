import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { userAuthContext } from "../context/UserAuthContext";

const ProtectedRoutes = ({ children }) => {
  let { user } = useContext(userAuthContext);
  if (!user) {
    return <Navigate to="/" />;
  }
  return children;
};

export default ProtectedRoutes;
