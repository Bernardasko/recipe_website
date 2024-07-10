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

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { path: '/', element: <App />, errorElement: <ErrorPage /> },
      { path: '/signup', element: <Signup />, errorElement: <ErrorPage /> },
      { path: '/login', element: <Login />, errorElement: <ErrorPage /> },
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
