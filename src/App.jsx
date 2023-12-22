import { useState, useEffect } from "react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import Navigation from "./components/Navigation/Navigation";
import NotesPage from "./pages/NotesPage";
import NewNotesPage from "./pages/NewNotesPage";
import ArchivedPage from "./pages/ArchivedPage";
import NotesDetailPage from "./pages/NotesDetailPage";
import NotFoundPage from "./pages/NotFoundPage";

const App = () => {
  const location = useLocation();
  const [navOpen, setNavOpen] = useState(false);

  useEffect(() => {
    const windowWidth = window.innerWidth;
    setNavOpen(windowWidth < 1024 ? false : true);
  }, []);

  if (location.pathname === "/") return <Navigate to="/notes" />;

  const isRouteMatched =
    /^\/archived($|\/)/.test(location.pathname) ||
    /^\/notes($|\/)/.test(location.pathname);

  return (
    <>
      <div
        className={`bg-gray-200 w-screen min-h-screen text-white ${
          navOpen ? "pl-[300px]" : "pl-[75px]"
        } duration-[250ms]`}
      >
        {isRouteMatched ? (
          <>
            <Navigation
              navState={navOpen}
              setNav={() => setNavOpen(!navOpen)}
            />
            <div
              className={
                navOpen ? "w-[calc(100vw - 300px)]" : "w-[calc(100vw - 75px)]"
              }
            >
              <Routes>
                <Route path="/notes" element={<NotesPage />} />
                <Route path="/notes/new" element={<NewNotesPage />} />
                <Route path="/archived" element={<ArchivedPage />} />
                <Route path="/error" element={<NotFoundPage />} />
                <Route path="/notes/:id" element={<NotesDetailPage />} />
                <Route path="/archived/:id" element={<NotesDetailPage />} />
              </Routes>
            </div>
          </>
        ) : (
          <>
            <Navigate to="/error" />
            <Routes>
              <Route path="/error" element={<NotFoundPage />} />
            </Routes>
          </>
        )}
      </div>
    </>
  );
};

export default App;
