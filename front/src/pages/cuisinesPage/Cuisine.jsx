import { useLoaderData, useParams } from "react-router-dom";
import RecipeCardSmall from "../../components/recipe/RecipeCardSmall";
import { Link } from "react-router-dom";
import { Typography } from "@mui/material";
import { Box } from "@mui/system";


function Cuisine() {
  const { categoryId } = useParams();
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
        {data[0].cuisine}
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
            <Link
              key={index}
              to={`/recipe/${recipe.recipeId}`}
            >
            <RecipeCardSmall recipeData={recipe} categoryId={categoryId} />
            </Link>
          );
        })}
      </Box>
    </>
  );
}

export default Cuisine;
