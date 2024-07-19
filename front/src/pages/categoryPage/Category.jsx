import { useParams, useLoaderData, Link } from 'react-router-dom';
import RecipeCardSmall from '../../components/recipe/RecipeCardSmall';
import { Typography, Pagination } from '@mui/material';
import { Box } from '@mui/system';
import SearchBar from '../../components/SearchBar';
import { useState } from 'react';
import { useEffect } from 'react';
import { categorySearch } from '../../services/get.mjs';



function Category() {
  const { categoryId } = useParams();
  const data = useLoaderData();
  console.log(data);

  const [sort, setSortCategory] = useState('recipes.title');
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [search, setSearch] = useState(null);
  const [recipes, setRecipes] = useState([]);
  const [order, setOrder] = useState('ASC');

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
        const searchResult = await categorySearch(data[0].category, queryString);
        setRecipes(searchResult)
      })();
    } catch (error) {
      
    }
  },[search, sort, page, limit])
  return (
    <>
      <SearchBar
        setLimit={setLimit}
        setSearch={setSearch}
        search={search}
        setSortCategory={setSortCategory}
        setOrder={setOrder}
      />
      <Typography
        variant='h3'
        component='h1'
        sx={{ textAlign: 'center', textTransform: 'uppercase' }}
        gutterBottom
        color='primary'
      >
        {data[0].category}
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
          console.log(recipe);
          return (
            <Link
              key={index}
              // to={`/category/${categoryId}/recipe/${recipe.recipeId}`}
              to={`/recipe/${recipe.recipeid}`}
            >
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
    </>
  );
}

export default Category;
