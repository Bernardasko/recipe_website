import { Link, Outlet } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
function Profile() {
  const token = jwtDecode(window.localStorage.getItem('token'));
  console.log(token);
  return (
    <>
      <h1>profile page</h1>
      {token.role === 'admin' && (
        <Link to={'/profile/categories'}>categories</Link>
      )}
      <button>Recipes</button>
      <Outlet />
    </>
  );
}

export default Profile;
