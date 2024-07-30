import axios from "axios";

export const postRecipe = async (formInfo) => {
  // console.log(formInfo);
  const post_recipe_url = import.meta.env.VITE_POST_RECIPE;
  const token = window.localStorage.getItem("token");
  try {
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    const response = await axios.post(post_recipe_url, formInfo, config);
    // console.log(response);
    return response;
  } catch (error) {
    console.error(error);
    return error;
  }
};

export const postNewCategory = async (categoryName) => {
  const token = window.localStorage.getItem("token");
  const post_cat_url = import.meta.env.VITE_POST_CAT;
  try {
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };

    const response = await axios.post(post_cat_url, categoryName, config);
    return response;
  } catch (error) {
    console.error(error);
    return error;
  }
};

export const postReview = async (review) => {
  const token = window.localStorage.getItem("token");
  const post_review_url = import.meta.env.VITE_SOCIAL;
  // console.log(post_review_url);
  try {
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };

    const response = await axios.post(post_review_url, review, config);
    // console.log(response);
    return response;
  } catch (error) {
    console.error(error);
    return error;
  }
};

export const postLikeByRecipeIdUserId = async (recipeid, userid) => {
  const token = window.localStorage.getItem("token");
  const post_like_url = import.meta.env.VITE_POST_LIKES;

  try {
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };

    const response = await axios.post(
      `${post_like_url}/${recipeid}/${userid}`,
      {},
      config
    );
    // console.log("Post like response:", response.data);
    return response;
  } catch (error) {
    console.error("Error posting like:", error);
    return error;
  }
};

export const followUser = async (followerId) => {
  const token = window.localStorage.getItem("token");
  const users_url = import.meta.env.VITE_USERS;
  try {
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    const response = await axios.post(
      `${users_url}/addFollower`,
      { followerId: followerId },
      config
    );
    return response;
  } catch (error) {
    console.error(error);
    return error;
  }
};

export const unfollowUser = async (followerId) => {
  const token = window.localStorage.getItem("token");
  const users_url = import.meta.env.VITE_USERS;
  try {
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    const response = await axios.post(
      `${users_url}/removeFollower`,
      { followerId: followerId },
      config
    );
    // console.log(response);
    return response;
  } catch (error) {
    console.error(error);
    return error;
  }
};
