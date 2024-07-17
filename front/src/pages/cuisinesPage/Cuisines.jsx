import { useLoaderData } from "react-router-dom";
import AllCuisinesRecipes from "./AllCuisineRecipes";
import { Link } from "react-router-dom";

function Cuisines() {
  const data = useLoaderData();
  console.log(data);
  return (
    <>
      <h1>All Cuisines</h1>
      {data.data.map((cuisine, index) => {
        console.log(cuisine);
        return (
          <Link key={index} to={`/cuisines/${cuisine.cuisineid}`}>
            <div className="border border-black m-2 p-2">
              <p>{cuisine.name}</p>
              
              <AllCuisinesRecipes cuisineId={cuisine.cuisineid} />
            </div>
          </Link>
        );
      })}
    </>
  );
}

export default Cuisines;
