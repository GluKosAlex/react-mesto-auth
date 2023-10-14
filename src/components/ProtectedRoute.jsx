import React from 'react';
import { Navigate } from 'react-router-dom';

export default function ProtectedRoute({ children, ...props }) {
  console.log(props.loggedIn);
  return props.loggedIn ? children : <Navigate to='/sign-in' replace />;
}
