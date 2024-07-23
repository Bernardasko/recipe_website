import Box from '@mui/material/Box';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import Button from '@mui/joy/Button';
import { useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import {
  styled,
  MenuItem,
  Select,
  Pagination,
  FormControl,
  InputLabel,
} from '@mui/material';
import { getRecipeComments } from '../../services/get.mjs';

const AddCommentRating = ({ recipeData, refresh }) => {
  const { id } = useParams();
  // console.log(recipeData);
  const [sort, setSort] = useState('date');
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [comments, setComments] = useState([]);

  const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }));

  const StyledSelect = styled(Select)(({ theme }) => ({
    color: 'inherit',
    '& .MuiSelect-icon': {
      color: 'inherit',
    },
    '& .MuiOutlinedInput-notchedOutline': {
      border: 'none',
    },
  }));

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

  const handleSort = (value) => {
    setSort(value);
  };

  let queryParams = new URLSearchParams();
  if (sort) queryParams.append('sort', sort);
  if (page) queryParams.append('page', page);
  if (limit) queryParams.append('limit', limit);
  const queryString = queryParams.toString();
// console.log(queryString);


  useEffect(() => {
    (async () => {
      const response = await getRecipeComments(
        recipeData.recipeid,
        queryString
      );
      setComments(response);

    })();
  }, [sort, page, limit, refresh]);
  return (
    <Box
    style={{
      maxWidth: '700px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
      justifyContent: 'center',
      padding: '20px',
      margin: 'auto',
      borderRadius: '8px',
    }}
  >
    {comments.length >= 1 ? (
      <>
        <div className='w-full flex flex-col sm:flex-row justify-between px-2'>
        <Box sx={{ display: 'flex', mb: 2, sm: { mb: 0 } }}>
            <MenuItem disabled>
              <em>Sort By:</em>
            </MenuItem>
            <MenuItem onClick={() => handleSort('created_at')}>Date</MenuItem>
            <MenuItem onClick={() => handleSort('popularity')}>Popularity</MenuItem>
          </Box>
          <Box sx={{ display: 'flex' }}>
            <MenuItem disabled>
              <em>Show:</em>
            </MenuItem>
            <MenuItem onClick={() => setLimit(5)}>5</MenuItem>
            <MenuItem onClick={() => setLimit(10)}>10</MenuItem>
          </Box>

          {/* <FormControl fullWidth>
            <InputLabel id='demo-simple-select-label'>per page</InputLabel>
            <Select
              labelId='demo-simple-select-label'
              id='demo-simple-select'
              // value={perPage}
              // label='perPage'
              // onChange={handleChange}
            >
              <MenuItem value={3}>Three</MenuItem>
              <MenuItem value={5}>Five</MenuItem>
              <MenuItem value={7}>Seven</MenuItem>
            </Select>
          </FormControl> */}
        </div>

        <div className='w-full border shadow-md flex rounded-lg'>
          <div className='w-full flex flex-col justify-start py-2 px-5 divide-y-2 space-y-2'>
            {comments.map((comment, index) => (
              <div className='flex' key={index}>
                <div className='w-full flex flex-col ml-3'>
                  <div className='w-full flex flex-col justify-between mt-2'>
                    <p className='capitalize'>
                      {comment.commenter_lastname} {comment.commentername},
                    </p>
                  </div>
                  <p className='mt-2'>Commented: {comment.commenttext}</p>
                </div>

                <div className='flex flex-col mr-3'>
                  <p className='text-sm text-right'>{comment.commentdate}</p>
                  <div className='text-right mt-2'>
                    <Button
                    id='btnlike'
                      sx={{ width: '' }}
                      color='danger'
                      variant='outlined'
                      onClick={handleLike}
                    >
                      <FavoriteBorderIcon />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className='mx-auto buttonrow'>
          {recipeData.social.comments && (
            <Pagination
            id='pagination'
              count={
                recipeData.social.comments.length % limit
                  ? Math.floor(recipeData.social.comments.length / limit) + 3
                  : Math.floor(recipeData.social.comments.length / limit)
              }
              color='primary'
              onChange={(e, value) => setPage(value)}
            />
          )}
        </div>
      </>
    ) : (
      <p>No Comments</p>
    )}
  </Box>
  );
};

export default AddCommentRating;
