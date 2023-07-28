import cloth from './../images/svg/clothes.svg';
import profile from './../images/svg/profile.svg';
import { useNavigate } from 'react-router-dom';

const NavbarOwner = () => {
  const navigate = useNavigate();

  const gotoHome = () => {
    navigate('/owner');
  };

  const gotoProfile = () => {
    navigate('/owner-profile');
  };

  return (
    <div className='btm-nav bg-[#E3887B]'>
      <button onClick={() => gotoHome()} className=''>
        <img src={cloth} alt='Selet cloths' />
      </button>

      <button onClick={() => gotoProfile()} className=''>
        <img src={profile} alt='User profile' />
      </button>
    </div>
  );
};

export default NavbarOwner;
