import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import logo from '../images/logo1.svg';
import { ProfileUserService, logoutUserService } from '../services/authService';
import { Cart, Order, OrderDetails } from '../models/servicemodel';
import { getUserOrdersService } from '../services/allservices';
import OrderCard from '../components/OrderCard';
import { useNavigate } from 'react-router-dom';

const ProfilePage = ({
  cart,
  order,
  setOrder,
  setIsSignIn,
}: {
  cart: Cart[];
  order: Order[];
  setOrder: Function;
  setIsSignIn: Function;
}) => {
  const [name, setName] = useState<string>('');
  const [address, setAddress] = useState<string>('');
  const [mobile, setMobile] = useState<string>('');
  const [orders, setOrders] = useState<any[]>([]);

  const navigate = useNavigate();

  useEffect(() => {
    const getProfile = async () => {
      const profile = await ProfileUserService();

      const getOrders = await getUserOrdersService(profile._id);

      setOrders(getOrders);
      setName(profile.fullName);
      setAddress(profile.address);
      setMobile(profile.phone);
    };
    getProfile();
  }, []);

  const loggedOut = async () => {
    const isLoggedOut = await logoutUserService();
    if (isLoggedOut) {
      setIsSignIn(false);
      navigate('/');
    }
  };

  return (
    <div className='overflow-y-auto' style={{ height: '92.5%' }}>
      <div className='flex flex-col items-center justify-start gap-4 mb-4'>
        <div className='w-full text-center mb-12 mt-6'>
          <img className='w-20 h-20 inline' src={logo} alt='logo' />
        </div>

        <h2 className='text-center mb-16 font-sans text-2xl font-bold'>Profile</h2>

        <div className='w-80 p-4'>
          <div className='flex justify-between items-center'>
            <p className='font-semibold text-lg'>Name:</p>
            <p className='font-normal text-base'>{name}</p>
          </div>

          <div className='flex justify-between items-center'>
            <p className='font-semibold text-lg'>Address:</p>
            <p className='font-normal text-base'>{address}</p>
          </div>

          <div className='flex justify-between items-center'>
            <p className='font-semibold text-lg'>Phone:</p>
            <p className='font-normal text-base'>{mobile}</p>
          </div>
        </div>

        <div className=' flex justify-center' style={{ justifySelf: 'flex-end' }}>
          <button
            onClick={() => loggedOut()}
            className='btn w-64 bg-red-600 font-semibold text-white text-xl text-center border-none shadow-md'
            type='button'
          >
            Logout
          </button>
        </div>

        {orders.length > 0 &&
          orders.map((oneOrder: OrderDetails) => {
            return <OrderCard order={oneOrder} />;
          })}
      </div>

      <Navbar cart={cart} />
    </div>
  );
};

export default ProfilePage;
