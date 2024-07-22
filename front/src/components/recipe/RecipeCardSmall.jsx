import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import { Link, useParams } from "react-router-dom";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

function RecipeCardSmall({ recipeData }) {
  console.log(recipeData);

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
      default:
        return recipeData.image;
    }
  };

  const defaultImage = recipeData.image ? recipeData.image : getDefaultImage(recipeData.category);

  return (
    <Card sx={{ width: 350, height: 480, margin: "10px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
      <CardActionArea>
        <CardMedia
          component="img"
          image={defaultImage}
          alt="recipe image"
          sx={{
            height: 300,
            width: "100%",
          }}
        />
        <CardContent>
          <Typography sx={{ textAlign: "center", height: "100%", }} gutterBottom variant="h5" component="div">
            recipe name: {recipeData.recipe} {recipeData.name}
          </Typography>
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
        <Button>
          <Link to={`/recipe/${id}`}>
            View Recipe
          </Link>
        </Button>
      </Box>
    </Card>
  );
}

export default RecipeCardSmall;
