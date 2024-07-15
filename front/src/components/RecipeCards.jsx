import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import { Card, CardMedia, CardContent, CardActions, Collapse, IconButton, Typography, Box } from '@mui/material';
import { Favorite as FavoriteIcon, Share as ShareIcon, ExpandMore as ExpandMoreIcon } from '@mui/icons-material';
import { getCategoryById } from '../services/get.mjs';
import { useLoaderData } from 'react-router-dom';
import { data } from 'autoprefixer';
import { useNavigate } from 'react-router-dom';

const ExpandMore = styled((props) => {
  const data = useLoaderData()
  console.log(data);
  const navigate = useNavigate()
  const [ids, setIds ] = useState([])
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function RecipeCards() {
  const [expanded, setExpanded] = useState({});
  const [category, setCategory] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const ids = [1, 2, 3, 4];
      try {
        const promises = ids.map(id => getCategoryById(`/${id}/recipes`));
        const responses = await Promise.all(promises);
        setCategory(responses.flat());
        console.log(responses.flat());
      } catch (error) {
        console.error(error);
      }
    };
    fetchCategories();
  }, []);

  const handleExpandClick = (recipeId) => {
    setExpanded((prevExpanded) => ({
      ...prevExpanded,
      [recipeId]: !prevExpanded[recipeId],
    }));
  };

  const categorizeRecipes = (recipes) => {
    return recipes.reduce((acc, recipe) => {
      if (!acc[recipe.category]) {
        acc[recipe.category] = [];
      }
      acc[recipe.category].push(recipe);
      return acc;
    }, {});
  };

  const categorizedRecipes = categorizeRecipes(category);

  const renderRecipeCard = (recipe) => (
    <Card key={recipe.recipeId} sx={{Width: 500, marginBottom: 2 }}>
      <CardMedia
        component="img"
        height="194"
        image="/static/images/cards/paella.jpg"
        alt={recipe.name}
      />
      <CardContent>
        <Typography 
          variant="h5" 
          component="div" 
          sx={{ 
            textAlign: 'center', 
            marginBottom: 2,
            fontWeight: 'bold'
          }}
        >
          {recipe.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Cuisine: {recipe.cuisine}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
        <ExpandMore
          expand={expanded[recipe.recipeId]}
          onClick={() => handleExpandClick(recipe.recipeId)}
          aria-expanded={expanded[recipe.recipeId]}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded[recipe.recipeId]} timeout="auto" unmountOnExit>
      </Collapse>
    </Card>
  );

  const renderRecipeSection = (title, recipes) => (
    <Box sx={{ marginBottom: 4 }}>
      <Typography 
        variant="h4" 
        component="h2" 
        sx={{ 
          textAlign: 'center', 
          marginBottom: 3,
          fontWeight: 'bold',
          textTransform: 'uppercase',
          borderBottom: '2px solid #1976d2',
          paddingBottom: 1
        }}
        onClick={navigate(`/`)}
      >
        {title}
      </Typography>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, justifyContent: 'center' }}>
        {recipes.map(renderRecipeCard)}
      </Box>
    </Box>
  );

  return (
    <>
    {/* {data.map((category, index) => {
      return (categorizedRecipes.drinks && renderRecipeSection('Drinks', categorizedRecipes.drinks))

    })} */}
      {categorizedRecipes['main dish'] && renderRecipeSection('Main Dishes', categorizedRecipes['main dish'])}
      {categorizedRecipes.drinks && renderRecipeSection('Drinks', categorizedRecipes.drinks)}
      {categorizedRecipes.dessert && renderRecipeSection('Desserts', categorizedRecipes.dessert)}
      {categorizedRecipes.appetiser && renderRecipeSection('Appetisers', categorizedRecipes.appetiser)}
    </>
  );
}