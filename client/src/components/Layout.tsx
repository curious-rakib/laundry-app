import { useContext, useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { AuthContext, AuthcontextType } from './../components/auth/auth.context';

const Layout = () => {
  // console.log(Outlet);
  const navigate = useNavigate();

  const { me } = useContext(AuthContext) as AuthcontextType;

  useEffect(() => {
    if (me.data?.type === 'customer') {
      navigate('/home');
    } else if (me.data?.type === 'owner') {
      navigate('/Owner');
    }
  }, [me]);

  return (
    <div className='w-full h-[100vh] overflow-auto bg-white  text-black relative'>
      <Outlet />
    </div>
  );
};

export default Layout;
