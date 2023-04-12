import { useState } from "react";
import AppContext from "./AppContext";

const Provider = ({ children }) => {
  const [search, setSearch] = useState({
    term: "",
    results: [],
  });

  const [actProfile, setActProfile] = useState(0);
  const [saleData, setSaleData] = useState();

  const contextValue = {
    search,
    setSearch,
    actProfile,
    setActProfile,
    saleData,
    setSaleData
  }

  return (
    <AppContext.Provider value={ contextValue }>
      { children }
    </AppContext.Provider>
  );
};

export default Provider;