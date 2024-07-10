import { AppBar, Box, Toolbar, Typography, Button, IconButton, CssBaseline, } from '@mui/material';
import { Home as HomeIcon } from '@mui/icons-material';
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
      <Box sx={{ flexGrow: 1 }}>
      <CssBaseline />
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <NavLink to="/" style={{  color: "inherit" }}>
            <HomeIcon />
            </NavLink>
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <Typography variant="h6" component="div" >
          <Button color="inherit">
             <NavLink to="/category" style={{ textDecoration: "none", color: "white" }}>
             Category
           </NavLink> 
          </Button>
          <Button color="inherit">
          <NavLink to="/about" style={{ textDecoration: "none", color: "white" }}>
            About
          </NavLink>
          </Button>
          </Typography>
          </Typography>
          <Typography variant="h6" component="div" sx={{ ml: 2 }}>
          </Typography>
          <Button color="inherit">
             <NavLink to="/profile" style={{ textDecoration: "none", color: "white" }}>
             Profile
           </NavLink> 
          </Button>
          {token ? (
            <Button color="inherit" onClick={clearToken}>
              <NavLink to="/" style={{ textDecoration: "none", color: "inherit" }}>
              Logout
              </NavLink>
            </Button>
          ) : (
            <Button color="inherit">
              <NavLink to="/login" style={{ textDecoration: "none", color: "inherit" }}>
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
