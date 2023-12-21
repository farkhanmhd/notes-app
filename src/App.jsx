import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import Navigation from "./components/Navigation/Navigation";
import NotesPage from "./pages/NotesPage";
import NewNotesPage from "./pages/NewNotesPage";
import ArchivedPage from "./pages/ArchivedPage";
import NotesDetailPage from "./pages/NotesDetailPage";
import NotFoundPage from "./pages/NotFoundPage";

const App = () => {
  const location = useLocation();

  if (location.pathname === "/") return <Navigate to="/notes" />;

  const isRouteMatched =
    /^\/archived($|\/)/.test(location.pathname) ||
    /^\/notes($|\/)/.test(location.pathname);

  return (
    <>
      <div className="bg-gray-200 w-screen min-h-screen text-white pl-[75px] lg:pl-[300px]">
        {isRouteMatched ? (
          <>
            <Navigation />
            <Routes>
              <Route path="/notes" element={<NotesPage />} />
              <Route path="/notes/new" element={<NewNotesPage />} />
              <Route path="/archived" element={<ArchivedPage />} />
              <Route path="/error" element={<NotFoundPage />} />
              <Route path="/notes/:id" element={<NotesDetailPage />} />
            </Routes>
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
