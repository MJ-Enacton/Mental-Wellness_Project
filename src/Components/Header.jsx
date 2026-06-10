import { NavLink } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../features/JournalMoodSlice";

const Header = () => {
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.theme);

  return (
    <nav className="w-full py-4 px-6 fixed top-0 z-100 backdrop-blur-3xl shadow-md transition-all duration-500 bg-white/80 dark:bg-slate-900/80 dark:shadow-slate-800">
      <div className="max-w-6xl mx-auto flex gap-6 items-center justify-between">
        <div className="flex gap-6 items-center">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `transition-colors duration-300
              text-slate-700 hover:text-slate-900
              dark:text-slate-300 dark:hover:text-white
              ${isActive ? "text-blue-500 font-bold" : ""}`
            }
          >
            Home
          </NavLink>

          <NavLink
            to="/journals"
            className={({ isActive }) =>
              `transition-colors duration-300
              text-slate-700 hover:text-slate-900
              dark:text-slate-300 dark:hover:text-white
              ${isActive ? "text-blue-500 font-bold" : ""}`
            }
          >
            Journals
          </NavLink>

          <NavLink
            to="/moods"
            className={({ isActive }) =>
              `transition-colors duration-300
              text-slate-700 hover:text-slate-900
              dark:text-slate-300 dark:hover:text-white
              ${isActive ? "text-blue-500 font-bold" : ""}`
            }
          >
            Moods
          </NavLink>

          <NavLink
            to="/quotes"
            className={({ isActive }) =>
              `transition-colors duration-300
              text-slate-700 hover:text-slate-900
              dark:text-slate-300 dark:hover:text-white
              ${isActive ? "text-blue-500 font-bold" : ""}`
            }
          >
            Quotes
          </NavLink>
        </div>

        <button
          onClick={() => dispatch(toggleTheme())}
          className="px-4 py-2 rounded-lg cursor-pointer transition-all duration-300
          bg-gray-100 hover:bg-gray-50 text-black
          dark:bg-slate-700 dark:hover:bg-slate-600"
        >
          {theme === "light" ? "🌙" : "☀️"}
        </button>
      </div>
    </nav>
  );
};

export default Header;
