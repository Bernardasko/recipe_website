import { Link, Outlet } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
function Profile() {
  const token = jwtDecode(window.localStorage.getItem('token'));
  return (
    <>
      <h1 className='text-center my-2 text-2xl capitalize'>profile page</h1>
      <div className='flex justify-around'>
        {token.role === 'admin' && (
          <Link to={'/profile/categories'}>categories</Link>
        )}
        <Link to={'/profile/recipes'}>
          <button>Recipes</button>
        </Link>
        <Link to={'/profile/add_recipe'}>
          <button>Add Recipe</button>
        </Link>
      </div>
      <Outlet />
    </>
  );
}

export default Profile;
