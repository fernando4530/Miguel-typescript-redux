import { useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Navbar from "./components/Navbar";

const App = () => {
  const [showViews, setShowViews] = useState(true);
  const [showFavorites, setShowFavorites] = useState(false);

  const handleShowRandomUser = () => {
    setShowViews(true);
    setShowFavorites(false);
  };

  const handleShowMyAgenda = () => {
    setShowViews(false);
    setShowFavorites(false);
  };

  const handleShowFavorites = () => {
    setShowViews(false);
    setShowFavorites(true);
  };

  return (
    <Router>
      <Navbar
        showViews={showViews}
        handleShowRandomUser={handleShowRandomUser}
        handleShowMyAgenda={handleShowMyAgenda}
        handleShowFavorites={handleShowFavorites}
        showFavorites={showFavorites}
      />
    </Router>
  );
};

export default App;
