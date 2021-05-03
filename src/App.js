import React, { useState } from "react";
import "./App.css";
import { Route, Switch } from "react-router-dom";
import Navbar from "./Navbar";
import HeroCards from "./HeroCards";
import StockTable from "./StockTable";
import SavedTable from "./SavedTable";
import { StockProvider } from "./StockContext";
import { StockPresentProvider } from "./StockPresentContext";

function App() {
  // eslint-disable-next-line
  const [mainTable, setMainTable] = useState([
    "COMPANY NAME",
    "SYMBOL",
    "REGION",
    "ACTION",
    "TYPE",
  ]);
  // eslint-disable-next-line
  const [savedTable, setSavedTable] = useState([
    "COMPANY NAME",
    "SYMBOL",
    "ACTION",
    "REGION",
    // "PRICE",
  ]);
  return (
    <StockProvider>
      <StockPresentProvider>
        <div className="App">
          <Navbar />
          <div className="main">
            <HeroCards />
            <hr />
            <Switch>
              <Route
                path="/home"
                component={() => (
                  <StockTable tableHeading={mainTable} isSearch={true} />
                )}
              />
              <Route
                path="/view"
                component={() => <SavedTable tableHeading={savedTable} />}
              />
            </Switch>
          </div>
        </div>
      </StockPresentProvider>
    </StockProvider>
  );
}

export default App;
