import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import CartCard from '../components/CartCard';
import Navbar from '../components/Navbar';
import logo from '../images/logo1.svg';
import { Cart, Order, Service } from '../models/servicemodel';
import { ProfileUserService } from '../services/authService';
import { makeAnOrderService } from '../services/allservices';
import { useNavigate } from 'react-router-dom';

const CartPage = ({
  cart,
  setCart,
  service,
  order,
  setOrder,
}: {
  cart: Cart[];
  setCart: Function;
  service: Service;
  order: Order[];
  setOrder: Function;
}) => {
  const [urgent, setUrgent] = useState(false);
  const [cost, setcost] = useState(0);
  const [instructions, setInstructions] = useState('');

  const navigate = useNavigate();

  const active = 'btn bg-[#E3887B] text-white border-none shadow-md';
  const notActive = 'btn bg-gray-300 text-gray-500 border-none shadow-md';

  useEffect(() => {
    let costSum = 0;
    cart.forEach(
      (oneCart) => (costSum += (oneCart.subCategory.price + (urgent ? 5 : 0)) * oneCart.count)
    );

    setcost(costSum);
  }, [cart, urgent]);

  useEffect(() => {
    const makeOrder = async () => {
      const profile = await ProfileUserService();
      console.log(instructions);
      const orders = cart.map((oneCart) => {
        const order: Order = {
          address: profile.address,
          instructions: instructions,
          price: (oneCart.subCategory.price + (urgent ? 5 : 0)) * oneCart.count,
          count: oneCart.count,
          deliveryType: urgent ? 'Urgent' : 'Regular',
          user: profile._id,
          serviceSubCategory: oneCart.subCategory._id,
          service: oneCart.service._id,
        };

        return order;
      });

      setOrder(orders);
    };

    makeOrder();
  }, [cart, instructions, urgent]);

  const submitOrder = async () => {
    if (order.length <= 0) {
      toast.error('Order failed');
      return;
    }

    order.map(async (oneOrder) => {
      const newOrder = await makeAnOrderService(oneOrder);
      return newOrder;
    });

    setCart([]);
    toast.success('Order successfull');
    navigate('/home');
  };

  return (
    <div
      className='overflow-y-auto w-11/12 flex flex-col items-center gap-10'
      style={{ height: '92.4%', margin: '0 auto' }}
    >
      <div className='w-full text-center mt-4'>
        <img className='w-20 h-20 inline' src={logo} alt='logo' />
      </div>

      <h2 className='text-center mb-5 font-sans text-2xl font-bold'>Cart</h2>

      {cart.map((oneCart) => {
        return <CartCard cart={oneCart} setCart={setCart} urgent={urgent} />;
      })}

      <div className='btn-group'>
        <button onClick={() => setUrgent(false)} className={urgent === false ? active : notActive}>
          Regular delivery
        </button>
        <button onClick={() => setUrgent(true)} className={urgent === true ? active : notActive}>
          Urgent delivery
        </button>
      </div>

      <div className=''>
        <h3 className='mb-2'>Spacial instructions:</h3>
        <textarea
          onChange={(event) => setInstructions(event.target.value)}
          className='textarea bg-white w-80 border-2 border-gray-300'
          placeholder='Write your instructions here . . .'
        ></textarea>
      </div>

      <div className='w-11/12'>
        <div className='flex flex-row justify-between items-center'>
          <p className=''>Cost:</p>
          <p className=''>${cost}.00</p>
        </div>
        <div className='flex flex-row justify-between items-center mb-4'>
          <p className=''>Service charge:</p>
          <p className=''>${cart.length > 0 ? 5 : 0}.00</p>
        </div>
        <div className='flex flex-row justify-between items-center'>
          <p className='font-semibold text-lg'>Total Price:</p>
          <p className='font-semibold text-lg'>${cost + (cart.length > 0 ? 5 : 0)}.00</p>
        </div>
      </div>

      <div className='mb-5'>
        <button
          onClick={() => submitOrder()}
          className='btn w-64 bg-[#E3887B] font-semibold text-white text-xl text-center border-none shadow-md'
        >
          Submit
        </button>
      </div>

      <Navbar cart={cart} />
    </div>
  );
};

export default CartPage;
