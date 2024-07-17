import { getCuisineById } from "../../services/get.mjs";
import { useEffect, useState } from "react";
import RecipeCardSmall from "../../components/recipe/RecipeCardSmall";
import { Link } from "react-router-dom";
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import '../../components/SwiperStyles.css';

function AllCuisinesRecipes({ cuisineId }) {
  const [recipes, setRecipes] = useState([]);
  console.log(recipes);
  useEffect(() => {
    (async () => {
      setRecipes(await getCuisineById(cuisineId));
    })();
  }, [cuisineId]);

  if (recipes.length === 1) {
    return (
      <div className="swiper-container-center">
        <div className="swiper-wrapper">
          <div className="swiper-slide">
            <Link to={`/recipe/${recipes[0].recipeId}`}>
              <RecipeCardSmall recipeData={recipes[0]} />
            </Link>
          </div>
        </div>
      </div>
    );
  }
  return (
    <>
    <Swiper
      modules={[Navigation, Pagination, Scrollbar, A11y]}
      spaceBetween={10}
      slidesPerView={1}
      navigation
      breakpoints={{
        640: { slidesPerView: 1 },
        768: { slidesPerView: 2 },
        1024: { slidesPerView: 3 },
        1440: { slidesPerView: 4 },
      }}
    >
      {recipes.map((recipe, index) => {
        return (
          <SwiperSlide key={index} className="swiper-slide-custom">
          <Link to={`/recipe/${recipe.recipeId}`} key={index}>
            <RecipeCardSmall  recipeData={recipe} />
          </Link>
        </SwiperSlide>
        );
      })}
      </Swiper>
    </>
  );
}

export default AllCuisinesRecipes;
