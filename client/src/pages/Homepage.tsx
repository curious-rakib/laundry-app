import Navbar from '../components/Navbar';
import dryClean from '../images/svg/circle.svg';
import wetWash from '../images/svg/wet-wash.svg';
import press from '../images/svg/iron-press.svg';
import washPress from '../images/svg/washing-machine.svg';
import logo from '../images/logo1.svg';
import { useNavigate } from 'react-router-dom';
import { Cart, Service } from './../models/servicemodel';
import services from './../utilities/Londri.services.json';
import ServiceButton from '../components/ServiceButton';

const Homepage = ({
  service,
  setService,
  cart,
}: {
  service: Service | null;
  setService: Function;
  cart: Cart[];
}) => {
  const navigate = useNavigate();

  const serviceImages = [dryClean, wetWash, press, washPress];

  const selectService = async (service: Service) => {
    setService(service);
    navigate('/add-garment');
  };

  return (
    <div>
      <div className='w-full text-center mb-12 mt-6'>
        <img className='w-20 h-20 inline' src={logo} alt='logo' />
      </div>

      <h2 className='text-center mb-16 font-sans text-2xl font-bold'>Choose a service</h2>

      <div className='grid grid-cols-2 justify-items-center gap-y-20'>
        {services.map((service, index) => (
          <ServiceButton
            key={service._id}
            service={service}
            onClick={() => selectService(service)}
            imageSrc={serviceImages[index]}
            children={undefined}
          ></ServiceButton>
        ))}
      </div>
      <Navbar cart={cart} />
    </div>
  );
};

export default Homepage;
