import { Avatar, Typography, Container, Box, Grid } from "@mui/material";
import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

function ProfileCard() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = window.localStorage.getItem("token");
    if (token) {
      const decoded = jwtDecode(token);
      setUser(decoded);
    }
  }, []);

//   const avatarUrl = user
//     ? `https://robohash.org/${user.name}`
//     : "https://robohash.org/default-avatar";
  // const avatarUrl = "https://images.unsplash.com/photo-1565958011703-44f9829ba187";
  const avatarUrl = `https://avatarfiles.alphacoders.com/373/373779.png`;

  return (
    <>
      <Container>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: 2,
            marginTop: 4,
            borderRadius: 2,
            boxShadow: 3,
            maxWidth: 500,
            margin: "auto",
            backgroundColor: "#f9f9f9",
            
          }}
        >
          {/* <Typography variant="h4" gutterBottom>
          This is my profile
        </Typography> */}
        <Grid container spacing={2} alignItems="center">
        <Grid item>
          <Avatar
            sx={{
              width: 150,
              height: 150,
              marginBottom: 2,
            }}
            // src="https://avatar.iran.liara.run/public"
            src={avatarUrl}
            // alt={user ? `${user.name} ${user.lastname}` : "User Avatar"}
          />
          </Grid>
          <Grid item xs={12} sm>
          <Typography variant="h6">
            Name: {user ? user.name : "Loading..."}
          </Typography>
          <Typography variant="h6">
            Last Name: {user ? user.lastname : "Loading..."}
          </Typography>
          <Typography variant="h6">
            Email: {user ? user.email : "Loading..."}
          </Typography>
          </Grid>
        </Grid>
        </Box>
      </Container>
    </>
  );
}

export default ProfileCard;
