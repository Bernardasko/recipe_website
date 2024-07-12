import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Container,
  Box,
  Grid,
  Typography,
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useForm } from 'react-hook-form';
import { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { AppContext } from '../context/AppContext';
import toast, { Toaster } from 'react-hot-toast';

export default function Signup() {
  const navigate = useNavigate();
  

  const signup_url =
    import.meta.env.VITE_SINGUP || 'http://localhost:3001/v1/users/signup';
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: '',
      lastname: '',
      email: '',
      password: '',
      repeatPassword: '',
    },
  });

  async function onSubmit(values) {
    try {
      console.log(values);
      const { status, data } = await axios.post(signup_url, values);
      if (status == 201) {
        window.localStorage.setItem('token', data);
        toast.success('Signup successful!');
        setTimeout(() => {
          navigate('/');
        }, 1000);
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
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
            Sign up
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
              id='name'
              label='Name'
              name='name'
              autoComplete='name'
              autoFocus
              {...register('name', { required: 'Please enter your name' })}
              error={!!errors.name}
              helperText={errors.name?.message}
            />
            <TextField
              margin='normal'
              required
              fullWidth
              id='lastname'
              label='Last Name'
              name='lastname'
              autoComplete='lastname'
              autoFocus
              {...register('lastname', {
                required: 'Please enter your Last Name',
              })}
              error={!!errors.lastname}
              helperText={errors.lastname?.message}
            />
            <TextField
              margin='normal'
              required
              fullWidth
              id='email'
              label='Email Address'
              name='email'
              autoComplete='email'
              autoFocus
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
                //   value: 8,
                //   message: 'Password must be at least 8 characters long',
                // },
                // maxLength: {
                //   value: 20,
                //   message: 'Password must be at most 20 characters long',
                // },
                // pattern: {
                //   value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>]).{8,20}$/,
                //   message: 'Password must include at least one uppercase letter, one lowercase letter, and one symbol',
                // },
              })}
              error={!!errors.password}
              helperText={errors.password?.message}
            />
            <TextField
              margin='normal'
              required
              fullWidth
              name='repeatPassword'
              label='Password Confirm'
              type='password'
              id='repeatPassword'
              autoComplete='new-password'
              {...register('repeatPassword', {
                required: 'Please confirm your password',
              })}
              error={!!errors.repeatPassword}
              helperText={errors.repeatPassword?.message}
            />
            <Button
              type='submit'
              fullWidth
              variant='contained'
              sx={{ mt: 3, mb: 2 }}
            >
              Sign up
            </Button>
            <Grid container>
              <Grid item>
                {/* <Link href="#" to = "/login" variant="body2">
                   Already have an account? Sign in
                </Link> */}
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Toaster />
      </Container>
    </>
  );
}
