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
import { useLoaderData } from "react-router-dom";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import PublicIcon from "@mui/icons-material/Public";

const theme = createTheme({
  palette: {
    primary: {
      main: "#1976d2",
    },
    secondary: {
      main: "#dc004e",
    },
  },
});

const RecipeCard = ({ recipe }) => {
  const data = useLoaderData()
  console.log(data);
  return (
    <Card sx={{ maxWidth: 600, margin: 'auto', marginTop: 4 }}>
      <CardMedia
        component="img"
        height="200"
        image={data.images[0]}
        alt={data.name}
      />
      <CardContent>
        <Typography variant="h4" gutterBottom>
          {data.name}
        </Typography>
        <Box sx={{ mb: 2 }}>
            <Chip
              icon={<RestaurantIcon />}
              label={data.category}
              color="primary"
              sx={{ mr: 1 }}
            />
            <Chip
              icon={<PublicIcon />}
              label={data.cuisine}
              color="secondary"
            />
          </Box>
        
        <Typography variant="h6" sx={{ mt: 2 }}>
          Ingredients:
        </Typography>
        <List>
          {data.ingredients.map((ing, index) => (
            <ListItem key={index}>
              <ListItemText 
                primary={`${ing.ingredient} - ${ing.amount}`}
              />
            </ListItem>
          ))}
        </List>
        
        <Divider sx={{ my: 2 }} />
        
        <Typography variant="h6">
          Steps:
        </Typography>
        <List>
          {data.steps.map((step) => (
            <ListItem key={step.step_number}>
              <ListItemText 
                primary={`Step - ${step.step_number}`}
                secondary={step.description}
              />
            </ListItem>
          ))}
        </List>
      </CardContent>
    </Card>
  );
};

export default RecipeCard;