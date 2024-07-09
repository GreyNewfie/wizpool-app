import { ThemeContext } from './ThemeContext';
import { useContext } from 'react';

// Custom hook to throw an error if theme is undefined
const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('Context is undefined');
  }
  return context;
};

export default useTheme;
