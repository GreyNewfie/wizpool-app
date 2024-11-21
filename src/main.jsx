import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App.jsx';
import CreatePoolPage from './pages/CreatePoolPage.jsx';
import ChoosePlayerPage from './pages/ChoosePlayerPage.jsx';
import ErrorPage from './pages/ErrorPage.jsx';
import ChooseTeamsPage from './pages/ChooseTeamsPage.jsx';
import PoolHomePage from './pages/PoolHomePage.jsx';
import PoolPlayersPage from './pages/PoolPlayersPage.jsx';
import PoolPicksPage from './pages/PoolPicksPage.jsx';
import SettingsPage from './pages/SettingsPage.jsx';
import ManagePlayersPage from './pages/ManagePlayersPage.jsx';
import ReassignTeamsPage from './pages/ReassignTeamsPage.jsx';
import ThemeProvider from './context/ThemeContext.jsx';
import ChooseLeaguePage from './pages/ChooseLeaguePage.jsx';
import DeletePoolPage from './pages/DeletePoolPage.jsx';
import { Provider } from 'react-redux';
import store from './state/store';
import { ClerkProvider } from '@clerk/clerk-react';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import ProtectedPoolRoute from './components/ProtectedPoolRoute.jsx';

// Import publishable key
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error('Missing Publishable Key');
}

const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <App />,
      errorElement: <ErrorPage />,
    },
    {
      path: '/choose-league',
      element: (
        <ProtectedRoute>
          <ChooseLeaguePage />
        </ProtectedRoute>
      ),
      errorElement: <ErrorPage />,
    },
    {
      path: '/create-pool',
      element: (
        <ProtectedRoute>
          <CreatePoolPage />
        </ProtectedRoute>
      ),
      errorElement: <ErrorPage />,
    },
    {
      path: '/choose-player',
      element: (
        <ProtectedRoute>
          <ChoosePlayerPage />
        </ProtectedRoute>
      ),
      errorElement: <ErrorPage />,
    },
    {
      path: '/choose-teams/:id',
      element: (
        <ProtectedRoute>
          <ChooseTeamsPage />
        </ProtectedRoute>
      ),
      errorElement: <ErrorPage />,
    },
    {
      path: '/pool-home',
      element: (
        <ProtectedPoolRoute>
          <PoolHomePage />
        </ProtectedPoolRoute>
      ),
      errorElement: <ErrorPage />,
    },
    {
      path: '/pool-players',
      element: (
        <ProtectedPoolRoute>
          <PoolPlayersPage />
        </ProtectedPoolRoute>
      ),
      errorElement: <ErrorPage />,
    },
    {
      path: '/pool-picks',
      element: (
        <ProtectedPoolRoute>
          <PoolPicksPage />
        </ProtectedPoolRoute>
      ),
      errorElement: <ErrorPage />,
    },
    {
      path: '/pool-settings',
      element: (
        <ProtectedPoolRoute>
          <SettingsPage />
        </ProtectedPoolRoute>
      ),
      errorElement: <ErrorPage />,
    },
    {
      path: '/manage-players',
      element: (
        <ProtectedPoolRoute>
          <ManagePlayersPage />
        </ProtectedPoolRoute>
      ),
      errorElement: <ErrorPage />,
    },
    {
      path: '/reassign-teams',
      element: (
        <ProtectedRoute>
          <ReassignTeamsPage />
        </ProtectedRoute>
      ),
      errorElement: <ErrorPage />,
    },
    {
      path: '/delete-pool',
      element: (
        <ProtectedPoolRoute>
          <DeletePoolPage />
        </ProtectedPoolRoute>
      ),
      errorElement: <ErrorPage />,
    },
  ],
  { basename: import.meta.env.BASE_URL },
);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
      <Provider store={store}>
        <ThemeProvider>
          <RouterProvider router={router} />
        </ThemeProvider>
      </Provider>
    </ClerkProvider>
  </React.StrictMode>,
);
