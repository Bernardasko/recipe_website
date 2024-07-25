// import { useState, useEffect } from 'react';
// import axios from 'axios';


import  { useState, useEffect } from 'react';
import { Button } from '@mui/material';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import axios from 'axios';
import { getIsUserLiked, getLikesByRecipeId } from '../services/get.mjs';
import { deleteLikeByRecipeIdUserId } from '../services/delete.mjs';
import { postLikeByRecipeIdUserId } from '../services/post.mjs';

const LikeButton = ({ recipeid, userid }) => {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
//   const token = window.localStorage.getItem('token');
//   const userid = token ? jwtDecode(token).id : null;

// const { recipeid } = req.params;

  useEffect(() => {
    const fetchLikes = async () => {
      try {
        
        const data = await getLikesByRecipeId(recipeid);
        // console.log('Like count response data:', data);
        setLikeCount(data.likeCount )

        if (userid) {
        
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
      {liked ? <ThumbUpIcon /> : <ThumbUpOffAltIcon />} {likeCount}
    </Button>
  );
};

export default LikeButton;



