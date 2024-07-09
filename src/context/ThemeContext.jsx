import { createContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';

export const ThemeContext = createContext();

const ThemeProvider = ({ children }) => {
  const getInitialTheme = () => {
    const storedTheme = localStorage.getItem('theme');
    return storedTheme ? storedTheme : 'dark';
  };

  const [theme, setTheme] = useState(getInitialTheme);

  useEffect(() => {
    document.body.className = theme;
    localStorage.setItem('theme', theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

ThemeProvider.propTypes = {
  children: PropTypes.element,
};

export default ThemeProvider;
