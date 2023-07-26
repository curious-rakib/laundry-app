import remove from '../images/removeButton.svg';
import { Cart, Service } from '../models/servicemodel';

const CartCard = ({
  cart,
  setCart,
  urgent,
}: {
  cart: Cart;
  setCart: Function;
  urgent: boolean;
}) => {
  const removeFromCart = (cart: Cart) => {
    setCart((carts: Cart[]) => {
      const index = carts.indexOf(cart);
      const newCart = [...carts];
      newCart.splice(index, 1);
      return newCart;
    });
  };

  return (
    <div className='flex justify-between items-center gap-3 w-11/12 p-3 rounded-xl shadow-xl'>
      <div className='w-52 pt-4 pb-4 pl-5 pr-5 rounded-2xl bg-[#E3887B] font-semibold text-white text-xl text-center'>
        {cart.subCategory.name}
      </div>
      <div className='w-full'>
        <p className='text-sm'>Unit price: ${cart.subCategory.price + (urgent ? 5 : 0)}</p>
        <p className='text-sm'>Quantity: {cart.count}</p>
        <p className='text-sm'>Service: {cart.service.name}</p>
        <p className='font-semibold text-xl'>
          Price: ${(cart.subCategory.price + (urgent ? 5 : 0)) * cart.count}
        </p>
      </div>
      <div className='w-12 flex justify-center items-center '>
        <button
          onClick={() => removeFromCart(cart)}
          className='btn btn-circle flex justify-center items-center bg-white border-none'
        >
          <img src={remove} />
        </button>
      </div>
    </div>
  );
};

export default CartCard;
