import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  Button,
  IconButton,
  CssBaseline,
} from '@mui/material';
import { Home as HomeIcon } from '@mui/icons-material';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { useContext } from 'react';
import { AppContext } from './src/context/AppContext';

function Layout() {
  const {setToken} = useContext(AppContext)
  const token = window.localStorage.getItem('token');
  let decoded;
  if (token) {
    decoded = jwtDecode(token);
  }

  const navigate = useNavigate();

  const clearToken = () => {
    localStorage.clear();
    setToken(null)
    navigate('/');
    window.location.reload();

  };

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <CssBaseline />
        <AppBar position='static'>
          <Toolbar>
            <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
              <Typography variant='h6' component='div'>
                <Button color='inherit'>
                  <NavLink
                    to='/'
                    style={{ textDecoration: 'none', color: 'white' }}
                    >
                    <HomeIcon sx={{ pb: 0.5 }} /> About
                  </NavLink>
                </Button>
                    {token && (
                      <Button color='inherit'>
                        <NavLink
                          to='/category'
                          style={{ textDecoration: 'none', color: 'white' }}
                        >
                          Category
                        </NavLink>
                      </Button>
                    )}
              </Typography>
            </Typography>
            <Typography
              variant='h6'
              component='div'
              sx={{ ml: 2 }}
            ></Typography>
            {token && (
              <Button color='inherit'>
                <NavLink
                  to='/profile'
                  style={{ textDecoration: 'none', color: 'white' }}
                >
                  profile ({decoded.name})
                </NavLink>
              </Button>
            )}
            {!token && (
              <Button color='inherit'>
                <NavLink
                  to='/signup'
                  style={{ textDecoration: 'none', color: 'inherit' }}
                >
                  Signup
                </NavLink>
              </Button>
            )}
            {token ? (
              <Button color='inherit' onClick={clearToken}>
                <NavLink
                  to='/'
                  style={{ textDecoration: 'none', color: 'inherit' }}
                >
                  Logout
                </NavLink>
              </Button>
            ) : (
              <Button color='inherit'>
                <NavLink
                  to='/login'
                  style={{ textDecoration: 'none', color: 'inherit' }}
                >
                  Login
                </NavLink>
              </Button>
            )}
          </Toolbar>
        </AppBar>
      </Box>
      <Outlet />
    </>
  );
}

export default Layout;
