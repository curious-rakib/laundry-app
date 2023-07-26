import cloth from './../images/svg/clothes.svg';
import cartIcon from './../images/svg/cart.svg';
import profile from './../images/svg/profile.svg';
import { useNavigate } from 'react-router-dom';
import { Cart } from '../models/servicemodel';
import { useEffect } from 'react';

const Navbar = ({ cart }: { cart: Cart[] }) => {
  const navigate = useNavigate();

  const gotoHome = () => {
    navigate('/home');
  };

  const gotoCart = () => {
    navigate('/cart');
  };

  const gotoProfile = () => {
    navigate('/profile');
  };

  useEffect(() => {}, [cart]);

  return (
    <div className='btm-nav bg-[#E3887B]'>
      <button onClick={() => gotoHome()} className=''>
        <img src={cloth} alt='Selet cloths' />
      </button>

      <button onClick={() => gotoCart()} className='indicator'>
        <span
          className='indicator-item badge badge-secondary bg-red-900 border-none'
          style={{ right: '40px', top: '10px' }}
        >
          {cart.length}
        </span>
        <img src={cartIcon} alt='Cart' />
      </button>

      <button onClick={() => gotoProfile()} className=''>
        <img src={profile} alt='User profile' />
      </button>
    </div>
  );
};

export default Navbar;
