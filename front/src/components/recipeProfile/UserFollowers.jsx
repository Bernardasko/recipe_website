import { useLoaderData } from 'react-router-dom';
import { Link } from 'react-router-dom';

function UserFollowers() {
  const data = useLoaderData();
  //   console.log(data);
  return (
    <div className='border container mx-auto my-5 py-2 rounded-lg shadow-md'>
      {data.length >= 1 ? (
        <h1 className='text-center capitalize'>list of your all followers</h1>
      ) : (
        <h1 className='text-center capitalize'>You have no followers</h1>
      )}
      <ul className='mx-auto flex flex-wrap gap-3 justify-center'>
        {data.map((follower, index) => {
          console.log(follower.id);
          return (
            <Link key={index} to={`/profile/${follower.id}`}>
              <li className='border m-3 p-2 w-full inline-block'>
                <div>
                  <p>Name: {follower.name}</p>
                  <p>Lastname: {follower.lastname}</p>
                </div>
              </li>
            </Link>
          );
        })}
      </ul>
    </div>
  );
}

export default UserFollowers;
