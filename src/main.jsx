import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App.jsx';
import CreatePoolPage from './pages/CreatePoolPage.jsx';
import ChoosePlayerPage from './pages/ChoosePlayerPage.jsx';
import ErrorPage from './pages/ErrorPage.jsx';
import ChooseTeamsPage from './pages/ChooseTeamsPage.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/create-pool',
    element: <CreatePoolPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/choose-player',
    element: <ChoosePlayerPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/choose-teams',
    element: <ChooseTeamsPage />,
    errorElement: <ErrorPage />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
