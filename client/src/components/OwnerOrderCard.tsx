import { useNavigate } from 'react-router-dom';
import { OrderDetails } from '../models/servicemodel';

const OwnerOrderCard = ({ order }: { order: OrderDetails }) => {
  const navigate = useNavigate();

  const statusColor = {
    PENDING: 'bg-sky-500',
    ACCEPTED: 'bg-green-400',
    REJECTED: 'bg-red-400',
  };

  return (
    <div
      onClick={() => navigate(`/order-details/${order._id}`)}
      className='flex justify-between items-center gap-3 w-11/12 p-3 rounded-xl shadow-xl mb-4'
    >
      <div className='w-52 pt-4 pb-4 pl-5 pr-5 rounded-2xl bg-[#E3887B] font-semibold text-white text-xl text-center'>
        {order.serviceSubCategory.name}
      </div>

      <div className='w-full'>
        <p className='text-sm'>Service: {order.service.name}</p>
        <p className='text-sm'>Quantity: {order.count}</p>
        <div
          className={`uppercase ${
            statusColor[order.status]
          } text-xs font-semibold text-center w-fit pl-2 pr-2 pt-1 pb-1 rounded`}
        >
          {order.status}
        </div>
      </div>
    </div>
  );
};

export default OwnerOrderCard;
