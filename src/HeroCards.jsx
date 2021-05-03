import React, { useEffect, useState } from "react";
import "./HeroCards.css";
import HeroCard from "./HeroCard";
import { APIKEY } from "./Api_Key";

const HeroCards = () => {
  // eslint-disable-next-line
  const [heroStock, setHeroStock] = useState(["GOOGL", "FB", "AMZN"]);
  const [stockData, setStockData] = useState([]);

  useEffect(() => {
    const getStockData = async () => {
      for (var i = 0; i < heroStock.length; i++) {
        fetch(
          `https://www.alphavantage.co/query?function=OVERVIEW&symbol=${heroStock[i]}&apikey=${APIKEY}`
        )
          .then((response) => response.json())
          .then((data) => {
            setStockData((prev) => [
              ...prev,
              {
                symbol: data.Symbol,
                name: data.Name,
                cap: data.MarketCapitalization,
                price: data.AnalystTargetPrice,
                currency: data.Currency,
              },
            ]);
          });
      }
    };
    getStockData();
    // eslint-disable-next-line
  }, []);
  return (
    <div>
      <div class="herocards">
        {stockData.map((stock) => (
          <HeroCard
            symbol={stock.symbol}
            price={stock.price}
            currency={stock.currency}
            key={stock.price}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroCards;
