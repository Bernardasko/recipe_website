import RecipeCardProfile from './RecipeCardProfile';
import { useLoaderData } from 'react-router-dom';
function RecipeListProfile() {
  const data = useLoaderData();
  return (
    <>
      <div className='flex flex-wrap justify-center gap-10'>
        {data.recipes.length === 0 ? (
          <p>No data</p>
        ) : (
          data.recipes.map((item, index) => {
            return <RecipeCardProfile key={index} data={item}/>;
          })
        )}
      </div>
    </>
  );
}

export default RecipeListProfile;
