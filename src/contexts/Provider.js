import { useState } from "react";
import AppContext from "./AppContext";

const Provider = ({ children }) => {
  const [search, setSearch] = useState({
    term: "",
    results: [],
  });

  const contextValue = {
    search,
    setSearch,
  }

  return (
    <AppContext.Provider value={ contextValue }>
      { children }
    </AppContext.Provider>
  );
};

export default Provider;