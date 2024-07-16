import { useParams, useLoaderData, Link } from "react-router-dom";
import RecipeCardSmall from "../../components/recipe/RecipeCardSmall";
import { Typography } from "@mui/material";
import { Box } from "@mui/system";

function Category() {
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
        {data[0].category}
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
              to={`/category/${categoryId}/recipe/${recipe.recipeId}`}
            >
            <RecipeCardSmall recipeData={recipe} categoryId={categoryId} />
            </Link>
          );
        })}
      </Box>
    </>
  );
}

export default Category;
