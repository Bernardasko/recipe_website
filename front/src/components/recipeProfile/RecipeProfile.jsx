import RecipeListProfile from './RecipeListProfile';
import { jwtDecode } from 'jwt-decode';

function RecipeProfile() {
  const token = jwtDecode(window.localStorage.getItem('token'));
  return (
    <>
      {token.role === 'user' ? (
        <h1>Welcome to my recipes</h1>
      ) : (
        <h1 className='text-center text-2xl font-bold my-4'>All recipes</h1>
      )}
      <RecipeListProfile />
    </>
  );
}

export default RecipeProfile;
