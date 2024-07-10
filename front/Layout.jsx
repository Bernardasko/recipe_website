import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';

function Layout() {
  //   const { setToken } = useContext(UserContext);
  const token = window.localStorage.getItem('token');
  //   console.log(token, 'from layout');
  const navigate = useNavigate();
  const clearToken = () => {
    localStorage.clear();
    // setToken('');
  };

  return (
    <>
      <nav className='mt-4 bg-slate-500'>
        <ul className='flex justify-around'>
          <div className='flex gap-2'>
            <NavLink to={'/'}>
              <div className='px-5 py-3 border rounded-lg'>
                <li>About</li>
              </div>
            </NavLink>
            {token && (
              <NavLink to={'/appointments'}>
                <div className='px-5 py-3 border rounded-lg'>
                  <li>Appointments</li>
                </div>
              </NavLink>
            )}
          </div>
          <div className='flex gap-2'>
            {token ? (
              <NavLink to={'/'}>
                <div
                  className='px-5 py-3 border rounded-lg'
                  onClick={clearToken}
                >
                  <li>Log Out</li>
                </div>
              </NavLink>
            ) : (
              <>
                <NavLink to={'/signup'}>
                  <div className='px-5 py-3 border rounded-lg'>
                    <li>Signup</li>
                  </div>
                </NavLink>
                <NavLink to={'/login'}>
                  <div className='px-5 py-3 border rounded-lg'>
                    <li>Login</li>
                  </div>
                </NavLink>
              </>
            )}
          </div>
        </ul>
      </nav>
      <Outlet />
    </>
  );
}

export default Layout;
