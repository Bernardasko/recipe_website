import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { Link, useParams } from 'react-router-dom';
import Button from '@mui/material/Button';
function RecipeCardSmall({ recipeData }) {
// console.log(recipeData);
  const exampleImgUrl = "https://www.sauletavirtuve.lt/wp-content/uploads/Biskvitinis-tortas-su-mangais-ir-braskemis_1200-1170x1753.jpg";
  const {categoryId} = useParams()
  return (
    <Card   sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140px"
          image={exampleImgUrl}
          alt="green iguana"
          sx={{
            height: "200px",
            width: "250px",
          }}

        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
          recipe name: {recipeData.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
          Cuisine: {recipeData.cuisine}
          </Typography>
          <Typography variant="body2" color="text.secondary">
          Category: {recipeData.category}
          </Typography>
        </CardContent>
      </CardActionArea>
      <Button>
        <Link to={`/recipe/${recipeData.recipeId}`}>
          View Recipe
        </Link>
      </Button>
    </Card>
  );
}

export default RecipeCardSmall;



