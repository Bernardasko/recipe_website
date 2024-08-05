import { Box, Button, Container, TextField, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import { postNewCategory } from '../../services/post.mjs';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

function NewCategory() {
  const navigate = useNavigate();
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm();

  async function onSubmit(data) {
    const newCat = {
      ...data,
    };
    try {
      const newCategory = await postNewCategory(newCat);
      if (newCategory.status === 201) {
        navigate('/profile/categories');
        reset();
        toast.success('New category created 🔥');
      } else if (newCategory.response.status === 406) {
        toast.error(`Category: ${data.category} already created`);
      } else if (newCategory.response.status === 411) {
        toast.error(`Category cannot be empty`);
      } else {
        toast.error('Error while creating category 🫤');
      }
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
            id='buttonnewcat'
              type='submit'
              fullWidth
              variant='contained'
              sx={{ mt: 3, mb: 2, bgcolor: '#ff8a65', "&:hover": {
                    bgcolor: "#ff7043",
                  }, }}
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
