import logo from '../images/logo1.svg';
import back from '../images/back.svg';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getOrderById, updateOrderStatus } from '../services/allservices';
import { OrderDetails } from '../models/servicemodel';
import check from '../images/check.svg';
import cross from '../images/cross.svg';

const OrderDetailsPage = () => {
  const [orderDetail, setOrederDetail] = useState<OrderDetails | null>(null);

  const navigate = useNavigate();
  const { orderId } = useParams();

  const statusColor = {
    PENDING: 'bg-sky-500',
    ACCEPTED: 'bg-green-400',
    REJECTED: 'bg-red-400',
  };

  useEffect(() => {
    const getOrderDetails = async () => {
      const orderDetails = await getOrderById(orderId!);
      setOrederDetail(orderDetails);
    };

    getOrderDetails();
  }, []);

  const handleStatusChange = async (status: 'ACCEPTED' | 'REJECTED' | 'PENDING') => {
    try {
      const updateStatus = await updateOrderStatus(orderId!, status);

      if (updateStatus && orderDetail) {
        setOrederDetail((prevState) => {
          if (prevState) return { ...prevState, status };
          else return null;
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='p-4 flex flex-col items-center'>
      <div className='w-full text-center mb-6 mt-6'>
        <img className='w-20 h-20 inline' src={logo} alt='logo' />
      </div>

      <div onClick={() => navigate('/owner')} className='mb-4 self-start'>
        <button className='btn btn-outline flex flex-row items-center font-bold text-[#E99980] border-zinc-300 border-2'>
          <img className='' src={back} alt='logo' />
          back
        </button>
      </div>

      <h2 className='text-center mb-16 font-sans text-2xl font-bold'>Order Details</h2>

      {orderDetail === null ? (
        <span className='loading loading-spinner loading-lg'></span>
      ) : (
        <div className='flex flex-col gap-3 w-11/12 mb-4'>
          <div className='flex justify-between items-center'>
            <p className='text-lg font-bold'>Order ID:</p>
            <p className=''>{orderDetail && orderDetail._id}</p>
          </div>
          <div className='flex justify-between items-center'>
            <p className='text-lg font-bold'>Current status:</p>
            <div
              className={`uppercase ${
                orderDetail && statusColor[orderDetail.status]
              } text-xs font-semibold text-center w-fit pl-2 pr-2 pt-1 pb-1 rounded`}
            >
              {orderDetail.status}
            </div>
          </div>
          <div className='flex justify-between items-center'>
            <p className='text-lg font-bold'>Customer Name:</p>
            <p className=''>{orderDetail && orderDetail.user.fullName}</p>
          </div>
          <div className='flex justify-between items-center'>
            <p className='text-lg font-bold'>Cutomer Phone:</p>
            <p className=''>{orderDetail && orderDetail.user.phone}</p>
          </div>
          <div className='flex justify-between items-center'>
            <p className='text-lg font-bold'>Customer Address:</p>
            <p className=''>{orderDetail && orderDetail.address}</p>
          </div>

          <div className='self-center flex justify-between items-center gap-3 w-11/12 p-3 rounded-xl shadow-xl mb-4'>
            <div className='w-52 pt-4 pb-4 pl-5 pr-5 rounded-2xl bg-[#E3887B] font-semibold text-white text-xl text-center'>
              {orderDetail && orderDetail.serviceSubCategory.name}
            </div>

            <div className='w-full'>
              <p className='text-sm'>Service: {orderDetail && orderDetail.service.name}</p>
              <p className='text-sm'>Quantity: {orderDetail && orderDetail.count}</p>
              {/* <p className='text-sm'>Service: {orderDetail && orderDetail.deliveryType}</p> */}
              <p className='font-semibold text-xl'>Price: ${orderDetail && orderDetail.price}</p>
            </div>
          </div>

          <div className='flex justify-between items-center'>
            <p className='text-lg font-bold'>Delivery Type:</p>
            <p className=''>{orderDetail && orderDetail.deliveryType} Delivery</p>
          </div>

          <div className=''>
            <p className='text-lg font-bold'>Special instructions:</p>
            <p className=''>
              {orderDetail && orderDetail.instructions === ''
                ? 'No special instructions.'
                : orderDetail.instructions}
            </p>
          </div>

          {orderDetail.status === 'PENDING' && (
            <div className='self-center h-12 flex flex-row gap-12 mb-4'>
              <button onClick={() => handleStatusChange('ACCEPTED')} className='btn btn-success'>
                Accept
              </button>
              <button onClick={() => handleStatusChange('REJECTED')} className='btn btn-error'>
                Reject
              </button>
            </div>
          )}

          {orderDetail.status === 'ACCEPTED' && (
            <div className='flex flex-row gap-2 self-center uppercase bg-green-400 text-base font-semibold pl-4 pr-4 pt-1 pb-1 rounded'>
              <img src={check} alt='check' />
              ACCEPTED
            </div>
          )}

          {orderDetail.status === 'REJECTED' && (
            <div className='flex flex-row gap-2 self-center uppercase bg-red-400 text-base font-semibold pl-4 pr-4 pt-1 pb-1 rounded'>
              <img src={cross} alt='check' />
              REJECTED
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default OrderDetailsPage;
