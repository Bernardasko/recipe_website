import { Box, Typography, List, ListItem, ListItemText } from "@mui/material";
import { NavLink, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { jwtDecode } from "jwt-decode";

function AppDrawer({ handleDrawerToggle }) {
  const { setToken } = useContext(AppContext);
  const token = window.localStorage.getItem("token");
  let decoded;
  if (token) {
    decoded = jwtDecode(token);
  }

  const navigate = useNavigate();

  const clearToken = () => {
    localStorage.clear();
    setToken(null);
    navigate("/");
    window.location.reload();
  };

  return (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        Menu
      </Typography>
      <List>
        <ListItem>
          <NavLink to="/" style={{ textDecoration: "none", color: "black" }}>
            <ListItemText primary="About" />
          </NavLink>
        </ListItem>
        {token && (
          <>
            <ListItem>
              <NavLink
                to="/category"
                style={{ textDecoration: "none", color: "black" }}
              >
                <ListItemText primary="Category" />
              </NavLink>
            </ListItem>
            <ListItem>
              <NavLink
                to="/profile"
                style={{ textDecoration: "none", color: "black" }}
              >
                <ListItemText primary={`Profile (${decoded.name})`} />
              </NavLink>
            </ListItem>
            <ListItem onClick={clearToken}>
              <NavLink
                to="/"
                style={{ textDecoration: "none", color: "black" }}
              >
                <ListItemText primary="Logout" />
              </NavLink>
            </ListItem>
          </>
        )}
        {!token && (
          <ListItem>
            <NavLink
              to="/login"
              style={{ textDecoration: "none", color: "black" }}
            >
              <ListItemText primary="Login" />
            </NavLink>
          </ListItem>
        )}
      </List>
    </Box>
  );
}

export default AppDrawer;
