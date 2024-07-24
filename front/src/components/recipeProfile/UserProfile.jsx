import { useState } from 'react';
import { useLoaderData, useParams } from 'react-router-dom';
import RecipeCardSmall from '../recipe/RecipeCardSmall';
import { Typography, Box, Link } from '@mui/material';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { followUser, unfollowUser } from '../../services/post.mjs';

function RecipeUsersAllCards() {
  const [following, setFollowing] = useState(false);
  const data = useLoaderData();
  console.log(data);
  const { profileId } = useParams();
  console.log(profileId);
  const handleFollow = async () => {
    const response = await followUser(profileId);
    console.log(response.status);
    if (response.status === 200) {
      return setFollowing((p) => !p);
    }
    if (response.response.status === 409) {
      return alert('already following');
    }
  };
  const handleUnfollow = async () => {
    const response = await unfollowUser(profileId);
    console.log(response);

    // setFollowing(p=>!p)
  };
  return (
    <>
      <Box
        sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
      >
        <Typography
          variant='h3'
          component='h1'
          sx={{ textAlign: 'center', textTransform: 'uppercase' }}
          gutterBottom
          color='primary'
        >
          {data[0].username} {data[0].userlastname}
        </Typography>
        {following ? (
          <Button onClick={handleUnfollow} variant='outlined'>
            Unfollow
          </Button>
        ) : (
          <Button onClick={handleFollow} variant='contained'>
            Follow
          </Button>
        )}
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
        {data.map((recipe, index) => {
          return <RecipeCardSmall recipeData={recipe} key={index} />;
        })}
      </Box>
    </>
  );
}

export default RecipeUsersAllCards;
