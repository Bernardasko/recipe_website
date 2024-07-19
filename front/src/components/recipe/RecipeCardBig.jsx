import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  List,
  ListItem,
  ListItemText,
  Divider,
  Box,
  Chip,
  createTheme,
} from '@mui/material';
import Rating from '@mui/material/Rating';
import { useLoaderData } from 'react-router-dom';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import PublicIcon from '@mui/icons-material/Public';
import AddCommentRating from '../social/AddCommentRating';
import CommentRaitingCards from '../social/CommentRaitingCards';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

const RecipeCardBig = ({ recipe }) => {
  const data = useLoaderData();

  return (
    <>
      <Card sx={{ maxWidth: 600, margin: 'auto', marginTop: 4 }}>
        <CardMedia
          component='img'
          height='200'
          image={data.image_url}
          alt={data.name}
        />
        <CardContent>
          <Typography variant='h4' gutterBottom>
            {data.name}
          </Typography>
          
          <div className='mt-2 mr-3'>
          <Typography variant='h6' gutterBottom textAlign={'left'}>
            Average
          </Typography>
          <Rating value={data.average_rating} precision={0.5} readOnly />
        </div>
          
          <Box sx={{ mb: 2 }}>
            <Chip
              icon={<RestaurantIcon />}
              label={data.category}
              color='primary'
              sx={{ mr: 1 }}
            />
            <Chip
              icon={<PublicIcon />}
              label={data.cuisine}
              color='secondary'
            />
          </Box>

          <Typography variant='h6' sx={{ mt: 2 }}>
            Ingredients:
          </Typography>
          <List>
            {data.ingredients.map((ing, index) => (
              <ListItem key={index}>
                <ListItemText primary={`${ing.ingredient} - ${ing.amount}`} />
              </ListItem>
            ))}
          </List>

          <Divider sx={{ my: 2 }} />

          <Typography variant='h6'>Steps:</Typography>
          <List>
            {data.steps.map((step, index) => (
              <ListItem key={index}>
                <ListItemText primary={` ${index + 1} - ${step}`} />
              </ListItem>
            ))}
          </List>
        </CardContent>
      </Card>
      <CommentRaitingCards recipeData={data} />
      <AddCommentRating recipeData={data} />
    </>
  );
};

export default RecipeCardBig;
