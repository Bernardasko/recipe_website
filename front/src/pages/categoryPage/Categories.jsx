import { useLoaderData } from "react-router-dom";
import AllcategoriesRecipes from "./AllCategoriesRecipes.jsx";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

function Categories() {
  const data = useLoaderData();

  return (
    <>
      <Typography
        variant="h3"
        component="h1"
        sx={{ textAlign: "center", textTransform: "uppercase", marginTop: "68px" }}
        gutterBottom
        color="primary"
      >
        All Categories
      </Typography>
      {data.map((category, index) => {
        return (
          <Box
            key={index}
            sx={{ border: "1px solid blue", marginBottom: "20px" }}
          >
            <Typography
              variant="h5"
              component="h2"
              sx={{ textAlign: "center", textTransform: "uppercase" }}
              gutterBottom
              color="primary"
            >
              {category.name}
            </Typography>
            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "center",
                gap: "20px",
                marginBottom: "20px",
              }}
            >
              <AllcategoriesRecipes categoryId={category.categoryid} />
            </Box>
            <Box sx={{ textAlign: "center", marginBottom: "20px" }}>
              <Button id="btnview" variant="contained" color="primary">
                <Link to={`/category/${category.categoryid}`} style={{ color: 'white', textDecoration: 'none' }}>
                  View all
                </Link>
              </Button>
            </Box>
          </Box>
        );
      })}
    </>
  );
}

export default Categories;
