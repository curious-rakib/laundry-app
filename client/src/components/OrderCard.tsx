import { OrderDetails } from '../models/servicemodel';

const OrderCard = ({ order }: { order: OrderDetails }) => {
  const statusColor = {
    PENDING: 'badge-info',
    ACCEPTED: 'badge-success',
    REJECTED: 'badge-error',
  };

  return (
    <div className='flex justify-between items-center gap-3 w-11/12 p-3 rounded-xl shadow-xl'>
      <div className='w-52 pt-4 pb-4 pl-5 pr-5 rounded-2xl bg-[#E3887B] font-semibold text-white text-xl text-center'>
        {order.serviceSubCategory.name}
      </div>

      <div className='w-full'>
        <p className='text-sm'>Unit price: ${order.serviceSubCategory.price}</p>
        <p className='text-sm'>Quantity: {order.count}</p>
        <p className='text-sm'>Service: {order.service.name}</p>
        <p className='text-sm'>Delivery: {order.deliveryType}</p>
        <p className='font-semibold text-xl'>Price: ${order.price}</p>
      </div>

      <div className={`badge ${statusColor[order.status]}`}>{order.status}</div>
    </div>
  );
};

export default OrderCard;
