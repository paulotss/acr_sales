import { useState } from "react";
import AppContext from "./AppContext";

const Provider = ({ children }) => {
  const [search, setSearch] = useState({
    term: "",
    results: [],
  });

  const [actProfile, setActProfile] = useState(0);

  const contextValue = {
    search,
    setSearch,
    actProfile,
    setActProfile
  }

  return (
    <AppContext.Provider value={ contextValue }>
      { children }
    </AppContext.Provider>
  );
};

export default Provider;