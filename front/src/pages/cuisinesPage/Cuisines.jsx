

import { useLoaderData } from "react-router-dom";
import AllCuisinesRecipes from "./AllCuisineRecipes";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

function Cuisines() {
  const data = useLoaderData();
  // console.log(data);
  return (
    <>
      <Typography
        variant="h3"
        component="h1"
        sx={{ textAlign: "center", textTransform: "uppercase", marginTop: "68px", fontFamily: 'Dancing Script, cursive' }}
        gutterBottom
        color="#5d4037"
      >
        All Cuisines
      </Typography >
      {data.map((cuisine, index) => {
        // console.log(cuisine);
        return (
          <Box
            key={index}
            sx={{ border: "4px solid #9fa8da", boxShadow: 3, marginBottom: "20px" }}
          >
            <Typography
              variant="h5"
              component="h2"
              sx={{ textAlign: "center", textTransform: "uppercase", color: '#5d4037' ,fontFamily: 'Dancing Script, cursive' }}
              gutterBottom
              color="primary"
            >
              {cuisine.name}
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
              <AllCuisinesRecipes cuisineId={cuisine.cuisineid} />
            </Box>
            <Box sx={{ textAlign: "center", marginBottom: "20px" }}>
              <Button id="btncuisineview" variant="contained" sx={{ bgcolor: "#ff8a65",
                  "&:hover": {
                    bgcolor: "#ff7043",
                  }, }}>
                <Link to={`/cuisines/${cuisine.cuisineid}`} style={{ color: 'white', textDecoration: 'none' }}>
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

export default Cuisines;