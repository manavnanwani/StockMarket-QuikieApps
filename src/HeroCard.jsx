import React from "react";
import "./HeroCard.css";

const HeroCard = ({ symbol, currency, price }) => {
  return (
    <div className="stock-card">
      <div className="stock-info1">
        <h3>{symbol}</h3>
        <img
          className="card-img"
          src={
            symbol === "FB"
              ? "https://i.pinimg.com/originals/af/9c/cb/af9ccb82cd058e86d5a487223980e31c.png"
              : symbol === "AMZN"
              ? "https://cdn.freelogovectors.net/wp-content/uploads/2016/12/amazon_logo.png"
              : symbol === "GOOGL"
              ? "https://www.freepnglogos.com/uploads/google-logo-png/google-logo-png-google-icon-logo-png-transparent-svg-vector-bie-supply-14.png"
              : ""
          }
          alt=""
        />
      </div>
      <div className="stock-info2">
        <h4>
          <span class="price">{price}</span> {currency}
        </h4>
      </div>
    </div>
  );
};

export default HeroCard;
