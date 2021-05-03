import React, { useState, createContext } from "react";

export const StockContext = createContext();

export const StockProvider = (props) => {
  const [savedData, setSavedData] = useState([]);
  return (
    <StockContext.Provider value={[savedData, setSavedData]}>
      {props.children}
    </StockContext.Provider>
  );
};
