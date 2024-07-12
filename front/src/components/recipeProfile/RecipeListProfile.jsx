import RecipeCardProfile from './RecipeCardProfile';
function RecipeListProfile({ data }) {
  console.log(data.length);
  return (
    <>
        {data.length === 0 ? <p>No data</p> : 
      data.map((item, index) => {
          return <RecipeCardProfile data={item} />;
        })}
    
    </>
  );
}

export default RecipeListProfile;
