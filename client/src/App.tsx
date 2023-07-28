import { Route, Routes } from 'react-router-dom';
import './App.css';
import Layout from './components/Layout';
import Register from './components/Register';
import AuthHere from './components/auth/auth.context';
import Authpage from './pages/Authpage';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Homepage from './pages/Homepage';
import Addgarment from './pages/Addgarment';
import { useState } from 'react';
import { Cart, Order, Service } from './models/servicemodel';
import CartPage from './pages/CartPage';
import ProfilePage from './pages/ProfilePage';
import LaundryOwnerPage from './pages/laundryOwnerPage';
import OrderDetailsPage from './pages/OrderDetailsPage';
import OwnerProfilePage from './pages/OwnerProfilePage';
import Protection from './components/Protection';

function App() {
  const [service, setService] = useState<Service | null>(null);
  const [cart, setCart] = useState<Cart[]>([]);
  const [order, setOrder] = useState<Order[]>([]);
  const [isSignIn, SetIsSignIn] = useState<Boolean>(false);

  return (
    <AuthHere>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Landing />} />
          <Route path='auth'>
            <Route index element={<Authpage />}></Route>
            <Route path='registration' element={<Register />} />
            <Route path='login' element={<Login setIsSignIn={SetIsSignIn} />} />
          </Route>
          <Route element={<Protection isSignIn={isSignIn} />}>
            <Route
              path='home'
              element={<Homepage service={service} setService={setService} cart={cart} />}
            />
            <Route
              path='profile'
              element={
                <ProfilePage
                  cart={cart}
                  order={order}
                  setOrder={setOrder}
                  setIsSignIn={SetIsSignIn}
                />
              }
            />
            <Route
              path='add-garment'
              element={<Addgarment service={service} cart={cart} setCart={setCart} />}
            />
            <Route
              path='cart'
              element={
                <CartPage
                  cart={cart}
                  setCart={setCart}
                  service={service!}
                  order={order}
                  setOrder={setOrder}
                />
              }
            />
            <Route path='owner' element={<LaundryOwnerPage />} />
            <Route path='owner-profile' element={<OwnerProfilePage setIsSignIn={SetIsSignIn} />} />
            <Route path='order-details/:orderId' element={<OrderDetailsPage />} />
          </Route>
        </Route>
      </Routes>
    </AuthHere>
  );
}

export default App;
