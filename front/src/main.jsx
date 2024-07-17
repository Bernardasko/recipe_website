import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import {
  createBrowserRouter,
  RouterProvider,
  useParams,
} from "react-router-dom";
import AppProvider from "./context/AppProvider";
import Layout from "../Layout.jsx";
import App from "./App.jsx";
import ErrorPage from "./error-page";
import Signup from "./components/Signup";
import Login from "./components/Login";
import CategoryPage from "./pages/categoryPage/CategoryPage";
import RecipeForm from "./components/RecipeForm.jsx";
import Profile from "./components/Profile";

import CategoriesProfile from "./components/categories/CategoriesProfile";

import Category from "./pages/categoryPage/Category";

import Categories from "./pages/categoryPage/Categories";

import {
  getAllCategories,
  getAllRecipesProfile,
  getAllCuisines,
  getCategoryById,
  getRecipeById,
  getCuisineById,
} from "./services/get.mjs";

import RecipeProfile from "./components/recipeProfile/RecipeProfile";
import RecipeCardBig from "./components/recipe/RecipeCardBig";

import Cuisines from "./pages/cuisinesPage/Cuisines.jsx";
import AllCuisinesRecipes from "./pages/cuisinesPage/AllCuisineRecipes.jsx";
import Cuisine from "./pages/cuisinesPage/Cuisine.jsx";

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { path: "/", element: <App />, errorElement: <ErrorPage /> },
      { path: "/signup", element: <Signup />, errorElement: <ErrorPage /> },
      { path: "/login", element: <Login />, errorElement: <ErrorPage /> },
      {
        path: "/category",
        children: [
          {
            index: true,
            element: <Categories />,
            loader: getAllCategories,
            errorElement: <ErrorPage />,
          },
          {
            path: "/category/:categoryId",
            element: <Category />,
            loader: async ({ params }) => {
              const { categoryId } = params;
              return await getCategoryById(categoryId);
            },
          },
          // {
          //   path: `/category/:categoryId/recipe/:recipeId`,
          //   element: <RecipeCardBig />,
          //   loader: async ({ params }) => {
          //     const { recipeId } = params;
          //     return await getRecipeById(recipeId);
          //   },
          // },
        ],
      },
      {
        path: "/cuisines",
        children: [
          {
            index: true,
            element: <Cuisines />,
            loader: getAllCuisines,
            errorElement: <ErrorPage />,
          },
          {
            path: "/cuisines/:cuisineId",
            element: <Cuisine />,
            loader: async ({ params }) => {
              const { cuisineId } = params;
              return await getCuisineById(cuisineId);
            },
          },
        ],
      },

      {
        path: "/recipe/:recipeId",
        element: <RecipeCardBig />,
        errorElement: <ErrorPage />,
        loader: async ({ params }) => {
          const { recipeId } = params;
          return await getRecipeById(recipeId);
        },
      },
      {
        path: "/recipeform",
        element: <RecipeForm />,
        errorElement: <ErrorPage />,
      },
      {
        path: "/profile",
        element: <Profile />,
        errorElement: <ErrorPage />,
        children: [
          {
            path: "/profile/categories",
            element: <CategoriesProfile />,
            loader: getAllCategories,
            errorElement: <ErrorPage />,
          },
          {
            path: "/profile/recipes",
            element: <RecipeProfile />,
            loader: async () => {
              const recipes = await getAllRecipesProfile();
              const cuisines = await getAllCuisines();
              const categories = await getAllCategories();
              return { recipes, cuisines, categories };
            },
            errorElement: <ErrorPage />,
          },
          {
            path: "/profile/add_recipe",
            element: <RecipeForm />,
            loader: async () => {
              const cuisines = await getAllCuisines();
              const categories = await getAllCategories();
              return { cuisines, categories };
            },
            errorElement: <ErrorPage />,
          },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AppProvider>
      <RouterProvider router={router} />
    </AppProvider>
  </React.StrictMode>
);
