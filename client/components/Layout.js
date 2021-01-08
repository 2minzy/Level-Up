import Head from 'next/head';
import Link from 'next/link';
import Router from 'next/router';
import { isAuth, logout } from '../helpers/auth';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

// progress bar
Router.onRouteChangeStart = url => NProgress.start();
Router.onRouteChangeComplete = url => NProgress.done();
Router.onRouteChangeError = url => NProgress.done();

const Layout = ({ children }) => {
  const head = () => (
    <>
      <link
        rel='stylesheet'
        href='https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css'
        integrity='sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T'
        crossOrigin='anonymous'
      />
      <link rel='stylesheet' href='/static/css/styles.css' />
    </>
  );
  const nav = () => (
    <ul className='nav bg-dark'>
      <li className='nav-item'>
        <Link href='/'>
          <a className='nav-link nav-logo'>Streami</a>
        </Link>
      </li>

      {!isAuth() && (
        <>
          <li className='nav-item'>
            <Link href='/login'>
              <a className='nav-link text-light'>Login</a>
            </Link>
          </li>
          <li className='nav-item'>
            <Link href='/register'>
              <a className='nav-link text-light'>Register</a>
            </Link>
          </li>
        </>
      )}

      {isAuth() && isAuth().role === 'admin' && (
        <li className='nav-item ml-auto'>
          <Link href='/admin'>
            <a className='nav-link text-light'>{isAuth().name}</a>
          </Link>
        </li>
      )}

      {isAuth() && isAuth().role === 'subscriber' && (
        <li className='nav-item ml-auto'>
          <Link href='/user'>
            <a className='nav-link text-light'>{isAuth().name}</a>
          </Link>
        </li>
      )}

      {isAuth() && (
        <li className='nav-item'>
          <a onClick={logout} className='nav-link text-light'>
            Logout
          </a>
        </li>
      )}
    </ul>
  );

  return (
    <>
      {head()} {nav()} <div className='container pt-5 pb-5'>{children}</div>
    </>
  );
};

export default Layout;
