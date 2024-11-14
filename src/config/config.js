export const getApiBaseUrl = () => {
  // Check if in development mode
  if (!import.meta.env.VITE_API_BASE_URL) {
    console.warn('API Base URL is found in environment variables');
  }
  return import.meta.env.VITE_API_BASE_URL;
};
