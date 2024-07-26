
import  { useState, useEffect } from 'react';
import { Button } from '@mui/material';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt';
// import axios from 'axios';
import { getIsUserLiked, getLikesByRecipeId } from '../services/get.mjs';
import { deleteLikeByRecipeIdUserId } from '../services/delete.mjs';
import { postLikeByRecipeIdUserId } from '../services/post.mjs';
import { jwtDecode } from 'jwt-decode';


const LikeButton = ({ recipeid }) => {
    
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);

  const token = window.localStorage.getItem('token');
  const decodedToken = token ? jwtDecode(token) : null;
  const userid = decodedToken ? decodedToken.id : null;

  useEffect(() => {
    const fetchLikes = async () => {
        
      try {
        console.log('Recipe ID:', recipeid);
        console.log('User ID:', userid);

        if (!recipeid) {
            console.error('Missing recipe ID');
            return;
          }

        const data = await getLikesByRecipeId(recipeid);
        // console.log('Like count response data:', data);
        setLikeCount(Number(data.likeCount));

        if (userid) {
            console.log('Checking if user liked for user ID:', userid);
        const checkLike = await getIsUserLiked(recipeid, userid)
        console.log('Like count response data:', checkLike.liked);
      setLiked(checkLike.liked);
        }
      } catch (error) {
        console.error('Failed to fetch likes', error);
      }
    };

    fetchLikes();
  }, [recipeid, userid]);

  const handleLike = async () => {
    try {
      if (liked) {
        console.log('Deleting like for recipe ID:', recipeid, 'and user ID:', userid);
        const deleteLike = await deleteLikeByRecipeIdUserId(recipeid, userid);
        console.log(deleteLike);
        setLiked(false);
        setLikeCount(prevCount => prevCount - 1);
      } else {
        const postLike = await postLikeByRecipeIdUserId(recipeid, userid);
        console.log(postLike);
        setLiked(true);
        setLikeCount(prevCount => prevCount + 1);
      }
    } catch (error) {
      console.error('Failed to update like', error);
    }
  };

  return (
    <Button onClick={handleLike} disabled={!userid}>
      {liked ? <ThumbUpIcon /> : <ThumbDownAltIcon />} {likeCount}
    </Button>
  );
};

export default LikeButton;



