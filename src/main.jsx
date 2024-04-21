import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App.jsx';
import CreatePool from './pages/create-pool-page.jsx';
import ChooseAssignTeamsPlayer from './pages/choose-assign-teams-player-page.jsx';
import ErrorPage from './pages/error-page.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/create-pool',
    element: <CreatePool />,
  },
  {
    path: '/choose-assign-teams-player',
    element: <ChooseAssignTeamsPlayer />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
