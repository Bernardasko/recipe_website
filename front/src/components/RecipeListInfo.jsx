
import RecipeCardInfo from './RecipeCardInfo';
function RecipeListInfo({ data }) {
  // console.log(data);
  return ( 
    <>
    {data.length === 0 ? <p>No data</p> : 
      data.map((item, index) => {
          return <RecipeCardInfo data={item} />;
        })}
    
    </>
   );
}

export default RecipeListInfo;