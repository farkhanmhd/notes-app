import { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";

const ThemeContext = createContext();
const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    if (localStorage.theme === "dark") {
      document.documentElement.classList.add("dark");
      setTheme(localStorage.theme);
    }
  }, []);

  const switchTheme = () => {
    if (theme === "light") {
      document.documentElement.classList.add("dark");
      setTheme("dark");
      localStorage.theme = "dark";
    } else {
      document.documentElement.classList.remove("dark");
      setTheme("light");
      localStorage.theme = "light";
    }
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme, switchTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

ThemeProvider.propTypes = {
  children: PropTypes.element.isRequired,
};

export { ThemeContext, ThemeProvider };
