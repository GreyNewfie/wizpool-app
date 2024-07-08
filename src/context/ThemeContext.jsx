import { createContext, useContext, useState } from 'react';

export const ThemeContext = createContext();

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('dark');

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Custom hook to throw an error if theme is undefined
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('Context is undefined');
  }
  return context;
};

export default ThemeProvider;
