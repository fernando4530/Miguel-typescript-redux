import { useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Navbar from "./components/Navbar";

const App = () => {
  const [showUserInfo, setShowUserInfo] = useState(true);

  const handleShowUserInfo = () => {
    setShowUserInfo(true);
  };

  const handleShowSavedUsers = () => {
    setShowUserInfo(false);
  };

  return (
    <Router>
      <Navbar
        showUserInfo={showUserInfo}
        handleShowUserInfo={handleShowUserInfo}
        handleShowSavedUsers={handleShowSavedUsers}
      />
    </Router>
  );
};

export default App;
