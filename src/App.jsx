import { useEffect, useState } from "react";
import { Route, Routes, useNavigate, Navigate } from "react-router-dom";
import { UserFormProvider } from "./contexts/FormContext";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import NotesPage from "./pages/NotesPage";
import { NotesProvider } from "./contexts/NotesContext";
import { getUserLoggedIn, putAccessToken } from "./utils/api";
import Navigation from "./components/Navigation/Navigation";
import NotesDetailPage from "./pages/NotesDetailPage";
import NewNotesPage from "./pages/NewNotesPage";
import ArchivedPage from "./pages/ArchivedPage";
import { useLanguage } from "./hooks/useLanguage";
import { useTheme } from "./hooks/useTheme";
import NotFoundPage from "./pages/NotFoundPage";
import { useUser } from "./hooks/useUser";

const App = () => {
  const [authedUser, setAuthedUser] = useState(null);
  const [initializing, setInitializing] = useState(true);
  const [navOpen, setNavOpen] = useState(false);
  const { setLanguage } = useLanguage();
  const { theme } = useTheme();
  const navigate = useNavigate();
  const { setUsername } = useUser();

  useEffect(() => {
    const windowWidth = window.innerWidth;
    setNavOpen(windowWidth < 1024 ? false : true);
    setLanguage(localStorage.getItem("language") || "en");
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    }
    const isUserLoggedIn = async () => {
      const { data } = await getUserLoggedIn();
      if (data) {
        setAuthedUser(data);
        setUsername(data.name);
      }
      setInitializing(false);
    };
    isUserLoggedIn();
  }, []);

  const onLoginSuccess = async ({ accessToken }) => {
    putAccessToken(accessToken);
    const { data } = await getUserLoggedIn();
    setAuthedUser(data);
    setUsername(data.name);
    setInitializing(false);
    navigate("/notes");
  };

  const onLogout = () => {
    setAuthedUser(null);
    putAccessToken("");
  };

  const isRouteMatched =
    /^\/archived($|\/)/.test(location.pathname) ||
    /^\/notes($|\/)/.test(location.pathname);

  if (initializing) return null;
  if (authedUser === null) {
    return (
      <UserFormProvider>
        <Routes>
          <Route path="/register" element={<RegisterPage />} />
          <Route
            path="/*"
            element={<LoginPage loginSuccess={onLoginSuccess} />}
          />
        </Routes>
      </UserFormProvider>
    );
  }
  if (location.pathname === "/") return <Navigate to="/notes" />;
  return (
    <>
      <div
        className={`bg-gray-200 dark:bg-zinc-900 w-screen min-h-screen text-white ${
          navOpen ? "pl-[75px] md:pl-[300px]" : "pl-[75px]"
        } duration-[250ms]`}
      >
        {isRouteMatched && (
          <Navigation
            navState={navOpen}
            setNav={() => setNavOpen(!navOpen)}
            onLogout={onLogout}
          />
        )}

        <NotesProvider>
          <Routes>
            <Route path="/notes" element={<NotesPage />} />
            <Route path="/notes/new" element={<NewNotesPage />} />
            <Route path="/notes/:id" element={<NotesDetailPage />} />
            <Route path="/archived" element={<ArchivedPage />} />
            <Route path="/archived/:id" element={<NotesDetailPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </NotesProvider>
      </div>
    </>
  );
};

export default App;
