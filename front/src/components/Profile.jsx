import { Link, Outlet } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import ProfileCard from './ProfileCard';


function Profile() {
  const token = jwtDecode(window.localStorage.getItem('token'));
  return (
    <>
      <h1 className='text-center my-2 text-2xl capitalize'>profile page</h1>
     <ProfileCard/>
      <div className='flex justify-around'>
        {token.role === 'admin' && (
          <Link id='link' to={'/profile/categories'}>categories</Link>
        )}
        <Link to={'/profile/followers'}>
          <button id='buttonprof'>Followers</button>
        </Link>
        <Link to={'/profile/recipes'}>
          <button id='buttonprof'>Recipes</button>
        </Link>
        <Link to={'/profile/add_recipe'}>
          <button id='buttonprofrec'>Add Recipe</button>
        </Link>
      </div>
      <Outlet />
    </>
  );
}

export default Profile;
