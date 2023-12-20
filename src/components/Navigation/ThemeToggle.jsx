const ThemeToggle = () => {
  return (
    <div className="theme-toggle w-[300px] h-[52px] pl-7 py-3 pr-10 flex flex-col justify-around">
      <div className="lines w-[27px] h-[2px] bg-white origin-left transform rotate-45"></div>
      <div className="lines w-[27px] h-[2px] bg-white origin-left"></div>
      <div className="lines w-[27px] h-[2px] bg-white origin-left transform -rotate-45"></div>
    </div>
  );
};

export default ThemeToggle;
