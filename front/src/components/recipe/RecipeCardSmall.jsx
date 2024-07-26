import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import { Link, useParams } from "react-router-dom";
import Button from "@mui/material/Button";
// console.log(recipeData);
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
// function RecipeCardSmall({ recipeData }) {
function RecipeCardSmall({ recipeData, showRating }) {
  console.log(`testas`,recipeData);

  const { categoryId } = useParams();

  const id = recipeData.recipeId || recipeData.recipeid;
  

  const getDefaultImage = (category) => {
    switch (category) {
      case "appetiser":
        return "/appetizer.jpg";
      case "dessert":
        return "/dessert.jpg";
      case "drinks":
        return "/drinks.jpg";
      case "main dish":
        return "/main_dish.jpg";
      // default:
      //   return recipeData.images;
    }
  };

  const defaultImage = recipeData.images ? recipeData.images : getDefaultImage(recipeData.category);

  return (
    <Card sx={{ width: 315, height: 480, margin: "10px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
      <CardActionArea>
        <CardMedia
          component="img"
          image={defaultImage}
          alt="recipe image"
          sx={{
            height: 300,
            width: "100%",
            objectFit: "cover",
            objectPosition: "center",
          }}
        />
        <CardContent>
          <Typography sx={{ textAlign: "center", height: "100%", }} gutterBottom variant="h5" component="div">
            recipe name: {recipeData.recipe} {recipeData.name}
          </Typography>
          {showRating && recipeData.average_rating && (
            <Box sx={{ textAlign: "center"  }}>
              <Rating value={recipeData.average_rating} readOnly />
            </Box>
          )}
          
        </CardContent>
      </CardActionArea>
          <Box  sx={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column", height: "100%", width: "100%" }}>
          <Typography variant="body2" color="text.secondary">
            Cuisine: {recipeData.cuisine_name} {recipeData.cuisine}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Category: {recipeData.category}
          </Typography>
          </Box>
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "flex-end", height: "100%" }}>
        <Button id="btnlinkrecipe">
          <Link to={`/recipe/${id}`}>
            View Recipe
          </Link>
        </Button>
      </Box>
    </Card>
  );
}

export default RecipeCardSmall;
