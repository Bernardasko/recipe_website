import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { getRecipeByCategoryId } from '../../services/get.mjs';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import RecipeCardSmall from '../../components/recipe/RecipeCardSmall.jsx';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import '../../components/SwiperStyles.css';

export default function AllcategoriesRecipes({ categoryId }) {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    (async () => {
      setRecipes(await getRecipeByCategoryId(categoryId));
    })();
  }, []);

  if (recipes.length === 1) {
    return (
      <div className="swiper-container-center">
        <div className="swiper-wrapper">
          <div className="swiper-slide">
            <Link to={`/category/${categoryId}/recipe/${recipes[0].recipeId}`}>
              <RecipeCardSmall recipeData={recipes[0]} />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
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
      {recipes.map((recipe, index) => (
         <SwiperSlide key={index} className="swiper-slide-custom">
          <Link to={`/category/${categoryId}/recipe/${recipe.recipeId}`}>
            <RecipeCardSmall key={index} recipeData={recipe} />
          </Link>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}