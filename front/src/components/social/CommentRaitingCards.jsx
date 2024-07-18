import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import Button from '@mui/joy/Button';

import { useParams } from 'react-router-dom';

const AddCommentRating = ({ recipeData }) => {
  const { id } = useParams();
  // console.log(recipeData);

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
  // need to finish like functionllity
  const handleLike = () => {};

  return (
    <Box
      // key={index}
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
      <div className='w-full border shadow-md flex rounded-lg'>
        <div className='w-full flex flex-col justify-start py-2 px-5 divide-y-2 space-y-2'>
          {recipeData.social.comments ? recipeData.social.comments.map((comment, index) => {
            return (
              <div className='flex' key={index}>
                <div key={index} className='w-full flex flex-col ml-3'>
                  <div className='w-full flex flex-col  justify-between mt-2'>
                    <p className='capitalize'>
                      {comment.commenter_lastname} {comment.commenter_name},
                    </p>
                  </div>
                  <p className=' mt-2'>Commented: {comment.comment_text}</p>
                </div>

                <div className='flex flex-col mr-3'>
                  <p className=' text-sm text-right'>{comment.comment_date}</p>
                  <div className='text-right mt-2'>
                    <Button
                      sx={{ width: '' }}
                      color='danger'
                      variant='outlined'
                      onClick={handleLike}
                    >
                      <FavoriteBorderIcon color='' />
                    </Button>
                  </div>
                </div>
              </div>
            );
          })
          : <p>No Comments</p>
          
          }
        </div>

      </div>
    </Box>
  );
};

export default AddCommentRating;
