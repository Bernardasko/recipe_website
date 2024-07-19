import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { Link, useParams } from 'react-router-dom';
import Button from '@mui/material/Button';
function RecipeCardSmall({ recipeData }) {
console.log(recipeData);

  const {categoryId} = useParams()
  return (
    <Card   sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140px"
          image={recipeData.image}
          alt="recipe image"
          sx={{
            height: "200px",
            width: "250px",
          }}

        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
          recipe name: {recipeData.recipe}
          </Typography>
          <Typography variant="body2" color="text.secondary">
          Cuisine: {recipeData.cuisine_name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
          Category: {recipeData.category}
          </Typography>
        </CardContent>
      </CardActionArea>
      <Button>
        <Link to={`/recipe/${recipeData.recipeid}`}>
          View Recipe
        </Link>
      </Button>
    </Card>
  );
}

export default RecipeCardSmall;



