import React, { useState, createContext } from "react";

export const StockPresentContext = createContext();

export const StockPresentProvider = (props) => {
  const [saved, setSaved] = useState([]);
  return (
    <StockPresentContext.Provider value={[saved, setSaved]}>
      {props.children}
    </StockPresentContext.Provider>
  );
};
