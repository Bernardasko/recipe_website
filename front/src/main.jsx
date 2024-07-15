import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import AppProvider from './context/AppProvider';
import Layout from '../Layout.jsx';
import App from './App.jsx';
import ErrorPage from './error-page';
import Signup from './components/Signup';
import Login from './components/Login';
import CategoryPage from './pages/categoryPage/CategoryPage';
import RecipeForm from './components/RecipeForm.jsx';
import Profile from './components/Profile';

import CategoriesProfile from './components/categories/CategoriesProfile';

import Category from './pages/categoryPage/Category';

import Categories from './components/categories/Categories';

import {
  getAllCategories,
  getAllRecipesProfile,
  getAllCuisines,
  getCategoryById,
} from './services/get.mjs';

import RecipeProfile from './components/recipeProfile/RecipeProfile';

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { path: '/', element: <App />, errorElement: <ErrorPage /> },
      { path: '/signup', element: <Signup />, errorElement: <ErrorPage /> },
      { path: '/login', element: <Login />, errorElement: <ErrorPage /> },
      {
        path: '/category',

        children: [
          {
            index: true,
            element: <Categories />,
            loader: getAllCategories,
            errorElement: <ErrorPage />,
          },
          { path: '/category/:categoryName', element: <Category /> },
        ],
      },
      {
        path: '/recipeform',
        element: <RecipeForm />,
        errorElement: <ErrorPage />,
      },
      {
        path: '/profile',
        element: <Profile />,
        errorElement: <ErrorPage />,
        children: [
          {
            path: '/profile/categories',
            element: <CategoriesProfile />,
            loader: getAllCategories,
            errorElement: <ErrorPage />,
          },
          {
            path: '/profile/recipes',
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
            path: '/profile/add_recipe',
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

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AppProvider>
      <RouterProvider router={router} />
    </AppProvider>
  </React.StrictMode>
);
