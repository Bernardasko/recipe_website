import { useState, useEffect } from 'react';
import { 
  Container, 
  Typography, 
  Card, 
  CardContent, 
  List, 
  ListItem, 
  ListItemText,
  Chip,
  Box,
  ThemeProvider,
  createTheme,
  Grid,
  useMediaQuery,
  CircularProgress
} from '@mui/material';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import PublicIcon from '@mui/icons-material/Public';
import { getAllRecipes } from '../services/get.mjs';

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

const RecipeCardInfo = () => {
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await getAllRecipes();
        console.log(response);
        setRecipes(response);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchRecipes();
  }, []);

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        {recipes.map((recipe, recipeIndex) => (
          <Box key={recipe.recipeId} sx={{ mb: 6 }}>
            <Typography variant={isSmallScreen ? "h3" : "h2"} component="h1" gutterBottom color="primary">
              {recipe.name}
            </Typography>
            
            <Box sx={{ mb: 2 }}>
              <Chip icon={<RestaurantIcon />} label={recipe.category} color="primary" sx={{ mr: 1, mb: 1 }} />
              <Chip icon={<PublicIcon />} label={recipe.cuisine} color="secondary" sx={{ mb: 1 }} />
            </Box>

            <Grid container spacing={4}>
              <Grid item xs={12} md={6}>
                <Card sx={{ height: '100%' }}>
                  <CardContent>
                    <Typography variant="h5" component="h2" gutterBottom color="primary">
                      Ingredients
                    </Typography>
                    <List>
                      {recipe.ingredients && recipe.ingredients.map((item, index) => (
                        <ListItem key={index}>
                          <ListItemText 
                            primary={`${item.ingredient || ''} - ${item.amount || ''}`}
                          />
                        </ListItem>
                      ))}
                    </List>
                  </CardContent>
                </Card>
              </Grid>

              <Grid item xs={12} md={6}>
                <Card sx={{ height: '100%' }}>
                  <CardContent>
                    <Typography variant="h5" component="h2" gutterBottom color="primary">
                      Products Steps
                    </Typography>
                    <List>
                      {recipe.steps && recipe.steps.map((step, index) => (
                        <ListItem key={index}>
                          <ListItemText 
                            primary={`${step.step_number || ''} - ${step.description || ''}`}
                          />
                        </ListItem>
                      ))}
                    </List>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Box>
        ))}
      </Container>
    </ThemeProvider>
  );
};

export default RecipeCardInfo;