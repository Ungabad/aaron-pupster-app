import ThemeToggle from "./ThemeToggle";

const Header = () => {
  return (
    <header className='w-full p-4 bg-white dark:bg-gray-900 shadow-md'>
      <div className='flex justify-between items-center'>
        <h1 className='text-xl font-bold text-gray-900 dark:text-gray-100'>
          My Themed Site
        </h1>
        <ThemeToggle />
      </div>
    </header>
  );
};

export default Header;
