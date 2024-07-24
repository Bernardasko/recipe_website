import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  Button,
  IconButton,
  CssBaseline,
  Drawer,
} from '@mui/material';
import { Home as HomeIcon, Menu as MenuIcon } from '@mui/icons-material';
import { NavLink, Outlet } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { useContext, useState } from 'react';
import { AppContext } from './src/context/AppContext';
import SearchBar from './src/components/SearchBar';
import AppDrawer from './src/components/AppDrawer';
import { useNavigate } from 'react-router-dom';

const drawerWidth = 240;

function Layout() {
  const { setToken } = useContext(AppContext);
  const navigate = useNavigate();
  const token = window.localStorage.getItem('token');
  let decoded;
  if (token) {
    decoded = jwtDecode(token);
  }

  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const clearToken = () => {
    localStorage.clear();
    setToken(null);
    navigate('/', { replace: true });
    // window.location.reload('/')
  };

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <CssBaseline />
        <AppBar position='fixed'>
          <Toolbar>
            <IconButton
              color='inherit'
              aria-label='open drawer'
              edge='start'
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: 'none' } }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              variant='h6'
              component='div'
              sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
            >
              <Button id='about' color='inherit'>
                <NavLink
                  to='/'
                  style={{ textDecoration: 'none', color: 'white' }}
                >
                  <HomeIcon sx={{ pb: 0.5 }} /> About
                </NavLink>
              </Button>
              {token && (
                <Button id='btncategorylayout' color='inherit'>
                  <NavLink
                    to='/category'
                    style={{ textDecoration: 'none', color: 'white' }}
                  >
                    Category
                  </NavLink>
                </Button>
              )}
              {token && (
                <Button id='cuisines' color='inherit'>
                  <NavLink
                    to='/cuisines'
                    style={{ textDecoration: 'none', color: 'white' }}
                  >
                    Cuisines
                  </NavLink>
                </Button>
              )}
            </Typography>
            <Box sx={{ flexGrow: 1, display: { md: 'flex' } }}>
              {/* <SearchBar /> */}
            </Box>
            {token && (
              <>
                <Button
                  id='profile'
                  color='inherit'
                  sx={{ display: { xs: 'none', sm: 'block' } }}
                >
                  <NavLink
                    to='/profile'
                    style={{ textDecoration: 'none', color: 'white' }}
                  >
                    Profile ({decoded.name})
                  </NavLink>
                </Button>
                <Button
                id='logout'
                  color='inherit'
                  onClick={clearToken}
                  sx={{ display: { xs: 'none', sm: 'block' } }}
                >
                  Logout
                </Button>
              </>
            )}
            {!token && (
              <>
                <Button id='signup' color='inherit'>
                  <NavLink
                    to='/signup'
                    style={{ textDecoration: 'none', color: 'inherit' }}
                  >
                    SignUp
                  </NavLink>
                </Button>
                <Button id='login' color='inherit'>
                  <NavLink
                    to='/login'
                    style={{ textDecoration: 'none', color: 'inherit' }}
                  >
                    Login
                  </NavLink>
                </Button>
              </>
            )}
          </Toolbar>
        </AppBar>
        <Box component='nav'>
          <Drawer
            variant='temporary'
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true,
            }}
            sx={{
              display: { xs: 'block', sm: 'none' },
              '& .MuiDrawer-paper': {
                boxSizing: 'border-box',
                width: drawerWidth,
              },
            }}
          >
            <AppDrawer handleDrawerToggle={handleDrawerToggle} />
          </Drawer>
        </Box>
      </Box>
      <Outlet />
    </>
  );
}

export default Layout;
