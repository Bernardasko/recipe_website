import { useLoaderData } from "react-router-dom";
function RecipeCardBig() {
  const data = useLoaderData()
  console.log(data);
    return (
    <>
      <h1>recipe card big</h1>
    </>
  );
}

export default RecipeCardBig;
