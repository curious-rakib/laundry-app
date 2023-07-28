import { useCallback, useEffect, useState } from 'react';
import logo from '../images/logo1.svg';
import { getAllOrders } from '../services/allservices';
import OwnerOrderCard from '../components/OwnerOrderCard';
import NavbarOwner from '../components/NavbarOwner';
import { OrderDetails } from '../models/servicemodel';

const LaundryOwnerPage = () => {
  const [customerOrders, setCustomerOrders] = useState<OrderDetails[]>([]);
  const [filteredOrders, setFilteredOrders] = useState<OrderDetails[]>([]);
  const [selectedSatus, setSelectedSatus] = useState<string>('');

  useEffect(() => {
    const getCustomerOrders = async () => {
      try {
        const allCustomerOrders = await getAllOrders();
        setCustomerOrders(allCustomerOrders);
        setSelectedSatus('All');
      } catch (error) {
        console.log(error);
      }
    };

    getCustomerOrders();
  }, []);

  useEffect(() => {
    const filterCustomerOrder = (selectedSatus: string) => {
      if (selectedSatus === 'All') {
        setFilteredOrders(customerOrders);
      } else {
        const filteredOrderList = customerOrders.filter((order) => order.status === selectedSatus);
        setFilteredOrders(filteredOrderList);
      }
    };

    filterCustomerOrder(selectedSatus);
  }, [selectedSatus]);

  const changeStatus = (filter: string) => {
    setSelectedSatus(filter);
  };

  return (
    <div className='p-4 flex flex-col items-center'>
      <div className='w-full text-center mb-6 mt-6'>
        <img className='w-20 h-20 inline' src={logo} alt='logo' />
      </div>

      <h2 className='text-center mb-16 font-sans text-2xl font-bold'>Orders</h2>

      <div className='w-full grid grid-cols-2 gap-4 mb-8'>
        <button
          onClick={() => changeStatus('All')}
          className='btn bg-[#E3887B] text-gray-800 border-2 border-gray-300'
        >
          All
        </button>
        <button
          onClick={() => changeStatus('PENDING')}
          className='btn bg-[#E3887B] text-gray-800 border-2 border-gray-300'
        >
          Pending
        </button>
        <button
          onClick={() => changeStatus('ACCEPTED')}
          className='btn bg-[#E3887B] text-gray-800 border-2 border-gray-300'
        >
          Accepted
        </button>
        <button
          onClick={() => changeStatus('REJECTED')}
          className='btn bg-[#E3887B] text-gray-800 border-2 border-gray-300'
        >
          Rejected
        </button>
      </div>

      {filteredOrders.length > 0 &&
        filteredOrders.map((order) => {
          return <OwnerOrderCard order={order} />;
        })}

      <div style={{ height: '7vh' }}></div>

      <NavbarOwner />
    </div>
  );
};

export default LaundryOwnerPage;
