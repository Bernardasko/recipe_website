import RecipeListProfile from './RecipeListProfile';
import { useLoaderData } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

function RecipeProfile() {
    const token = jwtDecode(window.localStorage.getItem('token'));
  const data = useLoaderData()
  console.log(data)
  console.log(data.lenght);
    return (
    <>
    {token.role === 'user' ? <h1>Welcome to my recipes</h1> : <h1>All recipes</h1>}
    <RecipeListProfile data={data}/>

    </>
  );
}

export default RecipeProfile;
