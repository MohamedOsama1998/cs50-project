import { createContext } from "react";

const darkModeContext = createContext({
  darkMode: true,
  toggleDarkMode: () => {},
});

export default darkModeContext;
