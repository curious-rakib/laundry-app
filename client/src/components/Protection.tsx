import { ReactNode } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

function Protection({ isSignIn }: { isSignIn: Boolean }) {
  if (!isSignIn) {
    return <Navigate to='/' replace />;
  }

  return <Outlet />;
}

export default Protection;
