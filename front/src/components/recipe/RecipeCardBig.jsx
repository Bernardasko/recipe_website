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
  Button,
} from "@mui/material";
import Rating from "@mui/material/Rating";
import { useLoaderData, Link } from "react-router-dom";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import PublicIcon from "@mui/icons-material/Public";
import { useState } from "react";
import AddCommentRating from "../social/AddCommentRating";
import CommentRaitingCards from "../social/CommentRaitingCards";
import { jwtDecode } from "jwt-decode";
import LikeButton from "../LikeButton";



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
    //   return "/default.jpg";
  }
};

const RecipeCardBig = ({ recipe }) => {
  const data = useLoaderData();
  console.log(`recipe`, data);
  const token = window.localStorage.getItem("token");

  // let decoded;
  // if (token) {
  //   decoded = jwtDecode(token);
  // }
  const uniqueIngredients = Array.from(
    new Set(data.ingredients.map((ing) => JSON.stringify(ing)))
  ).map((ing) => JSON.parse(ing));

  const uniqueSteps = Array.from(
    new Set(data.steps.map((step) => JSON.stringify(step)))
  ).map((step) => JSON.parse(step));

  const [refresh, setRefresh] = useState(false);

  return (
    <>
      <Card sx={{ maxWidth: 600, margin: "auto", marginTop: 15 }}>
        <CardMedia
          component="img"
          height="200"
          image={data.image_url || getDefaultImage(data.category)}
          alt={data.name}
        />
        <CardContent>
          <Typography variant="h4" gutterBottom>
            {data.name}
          </Typography>
          {token && (
            <Button
              size="small"
              component={Link}
              to={`/profile/${data.creatorid}`}
            >
              Creator
            </Button>
          )}

          <div className="mt-2 mr-3">
            <Typography
              variant="h6"
              gutterBottom
              textAlign={"left"}
            ></Typography>
            <Rating value={data.average_rating} precision={0.5} readOnly />
          </div>
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
          <LikeButton recipeid={data.recipeid} />
          <Typography variant="h6" sx={{ mt: 2 }}>
            Ingredients:
          </Typography>
          <List>
            {uniqueIngredients.map((ing, index) => (
              <ListItem key={index}>
                <ListItemText primary={`${ing.ingredient} - ${ing.amount}`} />
              </ListItem>
            ))}
          </List>
          <Divider sx={{ my: 2 }} />
          <Typography variant="h6">Steps:</Typography>
          <List>
            {uniqueSteps.map((step, index) => (
              <ListItem key={index}>
                <ListItemText primary={` ${index + 1} - ${step}`} />
              </ListItem>
            ))}
          </List>
        </CardContent>
      </Card>
      <CommentRaitingCards
        recipeData={data}
        refresh={refresh}
        setRefresh={setRefresh}
      />
      <AddCommentRating recipeData={data} setRefresh={setRefresh} />
    </>
  );
};

export default RecipeCardBig;
