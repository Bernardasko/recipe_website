import { Box, Button, Container, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { postNewCategory } from '../../services/post.mjs';
import toast, { Toaster } from 'react-hot-toast';

function NewCategory({ setRefresh }) {
  const [error, setError] = useState('');
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  async function onSubmit(data) {
    const newCat = {
      ...data,
    };

    const newCategory = await postNewCategory(newCat);
    console.log(newCategory);
    if (newCategory.status === 201) {
      setRefresh((p) => !p);
      toast.success('New category created 🔥');
    }
    try {
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <Container component='main' maxWidth='xs'>
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography component='h1' variant='h5'>
            Add new category
          </Typography>
          <Box
            component='form'
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin='normal'
              fullWidth
              type='text'
              id='category'
              label='Category'
              name='category'
              {...register('category')}
              error={!!errors.category}
              helperText={errors.category ? errors.category.message : ''}
            />
            <Button
              type='submit'
              fullWidth
              variant='contained'
              sx={{ mt: 3, mb: 2 }}
            >
              Submit
            </Button>
          </Box>
        </Box>
      </Container>
      <Toaster />
    </>
  );
}

export default NewCategory;
