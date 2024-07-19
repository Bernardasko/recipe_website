import { useState } from 'react';
import { useLoaderData, useParams } from 'react-router-dom';
import RecipeCardSmall from '../../components/recipe/RecipeCardSmall';
import { Link } from 'react-router-dom';
import { Typography, Pagination, FormControl,MenuItem,InputLabel, Select } from '@mui/material';
import { Box } from '@mui/system';
import SearchBar from '../../components/SearchBar';
function Cuisine() {
  const { categoryId } = useParams();
  const data = useLoaderData();
  console.log(data);

  const [sort, setSort] = useState('date');
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  return (
    <>
    <div className='border'>
    
      <SearchBar setLimit={setLimit}/>
    </div>


      <Typography
        variant='h3'
        component='h1'
        sx={{ textAlign: 'center', textTransform: 'uppercase' }}
        gutterBottom
        color='primary'
      >
        {data[0].cuisine}
      </Typography>
      <Box
        sx={{
          marginTop: '50px',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '20px',
          marginBottom: '20px',
        }}
      >
        {data.map((recipe, index) => {
          return (
            <Link key={index} to={`/recipe/${recipe.recipeId}`}>
              <RecipeCardSmall recipeData={recipe} categoryId={categoryId} />
            </Link>
          );
        })}
      </Box>
      <Pagination
        count={
          data.length % limit
            ? Math.floor(data.length / limit) + 1
            : Math.floor(data.length / limit)
        }
        color='primary'
      />
    </>
  );
}

export default Cuisine;
