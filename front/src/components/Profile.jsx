import { Link, Outlet } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import ProfileCard from './ProfileCard';



function Profile() {
  const token = jwtDecode(window.localStorage.getItem('token'));
  return (
    <>
      {/* <h1 className='text-center my-2 text-2xl capitalize'>profile page</h1>
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
        </Link> */}
      <h1 style={{ marginTop: '68px', marginBottom: '20px' }} className='text-center my-2 text-2xl capitalize'>
        Profile Page
      </h1>
      <div className='flex flex-col md:flex-row md:justify-around mx-4'>
        <div className='md:w-1/2'>
          <ProfileCard />
        </div>
        <div className='md:w-1/6 flex flex-col space-y-4 mt-4 '>
          {token.role === 'admin' && (
            <Link id='link' to={'/profile/categories'}>
              <button  className='px-4 py-2 bg-[#ff8a65] rounded hover:bg-[#ff7043] text-white w-full'>
                Categories
              </button>
            </Link>
          )}

          <Link to={'/profile/followers'}>
            <button id='buttonproffollow' className='px-4 py-2 bg-[#ff8a65] rounded hover:bg-[#ff7043] text-white w-full'>
              Followers
            </button>
          </Link>
          <Link to={'/profile/recipes'}>
            <button id='buttonprof' className='px-4 py-2 bg-[#ff8a65] rounded hover:bg-[#ff7043] text-white w-full'>
              Recipes
            </button>
          </Link>
          <Link to={'/profile/add_recipe'}>
            <button id='buttonprofrec' className='px-4 py-2 bg-[#ff8a65] rounded hover:bg-[#ff7043] text-white w-full'>
              Add Recipe
            </button>
          </Link>
        </div>
      </div>
      <Outlet />
    </>
  );
}

export default Profile;
