import { useEffect, useState } from 'react';
import { useLoaderData, useParams } from 'react-router-dom';
import RecipeCardSmall from '../recipe/RecipeCardSmall';
import { Typography, Box, Link } from '@mui/material';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { followUser, unfollowUser } from '../../services/post.mjs';
import { useNavigate } from 'react-router-dom';

function RecipeUsersAllCards() {
  const [following, setFollowing] = useState(false);
  const data = useLoaderData();

  const navigate = useNavigate()
  const { profileId } = useParams();
  // console.log(profileId);
  const handleFollow = async () => {
    const response = await followUser(profileId);
    // console.log(response.status);
    if (response.status === 200) {
      setFollowing((p) => !p);
      navigate(`/profile/${profileId}`)
    }
    if (response.response.status === 409) {
      return alert('already following');
    }
  };
  const handleUnfollow = async () => {
    const response = await unfollowUser(profileId);
    // console.log(response);
    navigate(`/profile/${profileId}`)

  };
  const isOwnProfile = data.isFollow.isFollowing === 'This_is_your_own_profile';

  useEffect(() => {
    // console.log(data.isFollow.isFollowing);
    if (data.isFollow.isFollowing === true) {
      setFollowing(true);
    } else {
      setFollowing(false);
    }
  }, [following, handleUnfollow, handleFollow]);
  return (
    <>
      <Box
        sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 10 }}
      >
        <Typography
          variant='h3'
          component='h1'
          sx={{ textAlign: 'center', textTransform: 'uppercase' }}
          gutterBottom
          color='primary'
        >
          {data.getAll[0].username} {data.getAll[0].userlastname}
        </Typography>
        {!isOwnProfile &&
          (following ? (
            <Button id='btnunfoll' onClick={handleUnfollow} variant='outlined'>
              Unfollow
            </Button>
          ) : (
            <Button id='btnfll' onClick={handleFollow} variant='contained'>
              Follow
            </Button>
          ))}
      </Box>
      <Box
        sx={{
          marginTop: '50px',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '20px',
          marginBottom: '20px',
        }}
      >
        {data.getAll.map((recipe, index) => {
          return <RecipeCardSmall recipeData={recipe} key={index} />;
        })}
      </Box>
    </>
  );
}

export default RecipeUsersAllCards;
