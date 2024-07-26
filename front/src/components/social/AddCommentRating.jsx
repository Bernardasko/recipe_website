import { useState, useContext } from 'react';
import Rating from '@mui/material/Rating';
import Box from '@mui/material/Box';
import StarIcon from '@mui/icons-material/Star';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Controller, useForm } from 'react-hook-form';
import { postReview } from '../../services/post.mjs';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';


const labels = {
  0.5: 'Useless',
  1: 'Useless+',
  1.5: 'Poor',
  2: 'Poor+',
  2.5: 'Ok',
  3: 'Ok+',
  3.5: 'Good',
  4: 'Good+',
  4.5: 'Excellent',
  5: 'Excellent+',
};

function AddCommentRating({ recipeData, setRefresh }) {
const navigate = useNavigate()
const {recipeId: id} = useParams()

  const formSubmitHandler = async (commentData) => {

    try {
      const newData = {
        ...commentData,
        recipeId: recipeData.recipeid,
      };
      const isPosted = await postReview(newData);
      console.log(isPosted);
      if(isPosted.status === 201){
        reset()
        setRefresh((update) => update + 1);
        // navigate(`/recipe/${id}`)
      } else {
        // toast.error('Error is not posted')
        toast.error('Please create an account to be able to post comments')
      }
    } catch (error) {
      console.log(error);
    }
  };

  const [hover, setHover] = useState(-1);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      comment: '',
      rating: 2.5,
    },
  });

  return (
    <Box
      component='form'
      onSubmit={handleSubmit(formSubmitHandler)}
      style={{
        maxWidth: '700px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'center',
        padding: '20px',
        margin: 'auto',
        //   backgroundColor: '#f5f5f5',
        borderRadius: '8px',
      }}
    >
      <Controller
        name='comment'
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            label='Write your comment'
            multiline
            rows={3}
            variant='outlined'
            fullWidth
            error={!!errors.comment}
            helperText={errors.comment ? errors.comment.message : ''}
          />
        )}
        rules={{ required: 'Comment is required',
          validate: (value) =>
            value.trim() !== '' || 'Comment cannot be empty or just whitespace',
          maxLength: {
            value: 500,
            message: 'Comment cannot exceed 500 characters',
          }
         }}
      />

      <Controller
        name='rating'
        control={control}
        render={({ field }) => (
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '16px',
            }}
          >
            <Typography variant='h6' gutterBottom>
              Rate your excursion below
            </Typography>
            <Box
              sx={{
                width: 200,
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <Rating
                {...field}
                value={field.value}
                precision={0.5}
                onChange={(event, newValue) => {
                  field.onChange(newValue);
                }}
                onChangeActive={(event, newHover) => {
                  setHover(newHover);
                }}
                emptyIcon={
                  <StarIcon style={{ opacity: 0.55 }} fontSize='inherit' />
                }
              />
              {field.value !== null && (
                <Box sx={{ ml: 2 }}>
                  {labels[hover !== -1 ? hover : field.value]}
                </Box>
              )}
            </Box>
          </Box>
        )}
        rules={{ required: true }}
      />
      <Button id='addcomment' type='submit' variant='contained' sx={{bgcolor: '#ff8a65', "&:hover": {
                    bgcolor: "#ff7043",
                  }, }}>
        Add comment
      </Button>
      <Toaster/>
    </Box>
  );
}

export default AddCommentRating;
