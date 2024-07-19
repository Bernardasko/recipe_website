import { useLoaderData } from 'react-router-dom';
import RecipeCardSmall from '../recipe/RecipeCardSmall';
import { Typography, Box, Link } from '@mui/material';


function RecipeUsersAllCards() {
  const data = useLoaderData();
  console.log(data);

  return (
    <>
      <Typography
        variant="h3"
        component="h1"
        sx={{ textAlign: "center", textTransform: "uppercase" }}
        gutterBottom
        color="primary"
      >
       CREATOR: {data[0].username} {data[0].userlastname}
      </Typography>
      <Box
        sx={{
          marginTop: "50px",
          display: "flex",
          flexDirection: "row", 
          justifyContent: "center",
          alignItems: "center",
          flexWrap: "wrap", 
          gap: "20px",
          marginBottom: "20px",
        }}
      >
        {data.map((recipe, index) => {
          return (
            
            <RecipeCardSmall recipeData={recipe} key={index} />
            
          );
        })}
      </Box>
    </>
  );
}

export default RecipeUsersAllCards;
