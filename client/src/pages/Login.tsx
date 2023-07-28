import { useContext, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Mybtn } from './../components/Button';
import Logo from './../components/Logo';
import { AuthContext, AuthcontextType } from './../components/auth/auth.context';
import { authUserService, loginUserService } from './../services/authService';
import Cookies from 'js-cookie';
type loginData = {
  phone: string;
  password: string;
};

const Login = ({ setIsSignIn }: { setIsSignIn: Function }) => {
  const [searchParams] = useSearchParams();
  const userType = searchParams.get('user');

  const { updateMe } = useContext(AuthContext) as AuthcontextType;

  const [data, setData] = useState<loginData>({
    phone: '',
    password: '',
  });

  const inputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({
      ...data,
      [e.target.id]: e.target.value,
    });
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!data.phone.trim().length) {
      toast.error('Phone Number is required');
      return;
    }
    if (!data.password.trim().length) {
      toast.error('Password is required');
      return;
    }
    loginUserService(data)
      .then((res) => {
        // C.setItem("accessToken", res.accessToken);
        Cookies.set('accessToken', res.accessToken);
        // console.log(res.accessToken);

        authUserService()
          .then((res) => {
            console.log(res);
            updateMe(res);
            setIsSignIn(true);
            toast.success('Login Success');
          })
          .catch((err) => {
            console.log(err);
            toast.error('Login Failed');
          });
      })
      .catch((err) => {
        console.log(err);
        toast.error('Login Failed');
      });
  };

  return (
    <div className='pt-20'>
      <Logo description='Enjoy Your Best Experience With Us' />
      <form onSubmit={onSubmit} className='px-4 mt-6'>
        <div>
          <label htmlFor='phone' className='font-semibold   '>
            Phone Number
          </label>
          <input
            id='phone'
            name='phone'
            type='text'
            placeholder='Phone'
            onChange={inputHandler}
            className='mt-1  h-11 bg-white w-full px-4 border rounded-md'
          />
        </div>
        <div className='mt-2'>
          <label htmlFor='password' className='font-semibold'>
            Password
          </label>
          <input
            id='password'
            type='password'
            name='password'
            onChange={inputHandler}
            placeholder='Password '
            className='mt-1 outline-none h-11 bg-white w-full px-4 border rounded-md'
          />
        </div>
        <Mybtn className='w-full py-2 mt-4 bg-[#E3887B] rounded-lg text-white font-semibold p-5'>
          SIGN IN
        </Mybtn>
      </form>
      <Link to={`/auth/registration?user=${userType}`}>
        <p className='mt-4 text-center'>{`< Return to Sign Up`}</p>
      </Link>
    </div>
  );
};

export default Login;
