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

function App() {
  const [service, setService] = useState<Service | null>(null);
  const [cart, setCart] = useState<Cart[]>([]);
  const [order, setOrder] = useState<Order[]>([]);

  return (
    <AuthHere>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Landing />} />
          <Route path='auth'>
            <Route index element={<Authpage />}></Route>
            <Route path='registration' element={<Register />} />
            <Route path='login' element={<Login />} />
          </Route>
          <Route
            path='home'
            element={<Homepage service={service} setService={setService} cart={cart} />}
          />
          <Route path='profile' element={<ProfilePage cart={cart} />} />
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
        </Route>
      </Routes>
    </AuthHere>
  );
}

export default App;
