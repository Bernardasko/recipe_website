import { useEffect, useState } from 'react';
import { useLoaderData, useParams } from 'react-router-dom';
import RecipeCardSmall from '../../components/recipe/RecipeCardSmall';
import { Link } from 'react-router-dom';
import {
  Typography,
  Pagination,
  FormControl,
  MenuItem,
  InputLabel,
  Select,
} from '@mui/material';
import { Box } from '@mui/system';
import SearchBar from '../../components/SearchBar';
import { cuisineSearch } from '../../services/get.mjs';
function Cuisine() {
  const { categoryId } = useParams();
  const data = useLoaderData();
  // console.log(data);

  const [sort, setSortCusine] = useState('recipes.title');
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [search, setSearch] = useState(null);
  const [recipes, setRecipes] = useState([]);
  const [order, setOrder] = useState('ASC');
  // console.log(recipes);

  let queryParams = new URLSearchParams();
  if (search) queryParams.append('search', search);
  if (sort) queryParams.append('sort', sort);
  if (page) queryParams.append('page', page);
  if (limit) queryParams.append('limit', limit);
  if (order) queryParams.append('order', order);

  let queryString = queryParams.toString();

  useEffect(() => {
    try {
      (async () => {
        const searchResult = await cuisineSearch(data[0].cuisine, queryString);
        setRecipes(searchResult)
      })();
    } catch (error) {}
  }, [search, sort, page, limit]);
  return (
    <>
    <Box sx={{marginTop: '68px'}}>
      <div className='border'>
        <SearchBar
          setLimit={setLimit}
          setSearch={setSearch}
          search={search}
          setSortCusine={setSortCusine}
          setOrder={setOrder}
        />
      </div>

      <Typography
        variant='h3'
        component='h1'
        sx={{ textAlign: 'center', textTransform: 'uppercase', color: '#5d4037' ,fontFamily: 'Dancing Script, cursive'  }}
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
        {recipes.map((recipe, index) => {
          return (
            <Link key={index} to={`/recipe/${recipe.recipeid}`}>
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
        onChange={(e, value) => setPage(value)}
      />
      </Box>
    </>
  );
}

export default Cuisine;
