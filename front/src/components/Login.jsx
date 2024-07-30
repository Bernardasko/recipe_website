import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useForm } from 'react-hook-form';
import { useState, useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AppContext } from '../context/AppContext';
import toast, { Toaster } from 'react-hot-toast';
import { jwtDecode } from 'jwt-decode';


const theme = createTheme();

function Login() {
  const login_url = import.meta.env.VITE_LOGIN || 'http://localhost:3001/v1/users/login';
  const { setToken } = useContext(AppContext);
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
  });
  
  async function onSubmit(formInfo) {
    try {
      const { status, data } = await axios.post(login_url, formInfo);
      if (status === 200) {
        const decoded = jwtDecode(data);
        // console.log(decoded);
        setToken(decoded);
        // console.log(data);
        window.localStorage.setItem("token", data);
        toast.success("Login successful!");
        setTimeout(() => {
          navigate("/");
        }, 1000);
      }
    } catch (err) {
      console.log(err);
      if (err.response) {
        if (err.response.status === 400 || err.response.status === 401) {
          setError(err.response.data.message || "Invalid email or password");
        } else {
          setError("An error occurred. Please try again later.");
        }
      }
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <Container component='main' maxWidth='xs'>
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component='h1' variant='h5'>
            Log in
          </Typography>
          <Box
            component='form'
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin='normal'
              required
              fullWidth
              id='email'
              label='Email Address'
              name='email'
              autoComplete='email'
              {...register('email', {
                required: 'Please enter your email',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Invalid email address format',
                },
              })}
              error={!!errors.email}
              helperText={errors.email?.message}
            />
            <TextField
              margin='normal'
              required
              fullWidth
              name='password'
              label='Password'
              type='password'
              id='password'
              autoComplete='current-password'
              {...register('password', {
                required: 'Please enter your password',
                // minLength: {
                //     value: 8,
                //     message: 'Password must be at least 8 characters long',
                //   },
                //   maxLength: {
                //     value: 20,
                //     message: 'Password must be at most 20 characters long',
                //   },
                  // pattern: {
                  //   value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>]).{8,20}$/,
                  //   message: 'Password must include at least one uppercase letter, one lowercase letter, and one symbol',
                  // },
              })}
              error={!!errors.password}
              helperText={errors.password?.message}
            />
            {error && <Typography color='error'>{error}</Typography>}
            <Button
            id='buttonlogin'
              type='submit'
              fullWidth
              variant='contained'
              sx={{ mt: 3, mb: 2, bgcolor: "#ff8a65",
                "&:hover": {
                  bgcolor: "#ff7043",
                }, }}
            >
              Log In
            </Button>
            <Grid container>
              <Grid item>
                <NavLink to="/signup" variant="body2">
                  {"Don't have an account? Sign Up"}
                </NavLink>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Toaster />
      </Container>
    </ThemeProvider>
  );
}

export default Login;