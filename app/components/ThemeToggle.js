import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import { FiSun, FiMoon } from "react-icons/fi"; // React icons for sun and moon

const ThemeToggle = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <button
      onClick={toggleTheme}
      className='p-2 bg-gray-200 dark:bg-gray-800 rounded-full focus:outline-none'
      aria-label='Toggle Theme'
    >
      {theme === "light" ? (
        <FiSun className='text-yellow-500 w-6 h-6' />
      ) : (
        <FiMoon className='text-blue-500 w-6 h-6' />
      )}
    </button>
  );
};

export default ThemeToggle;
