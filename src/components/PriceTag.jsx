import React from "react";

const PriceTag = ({ price, className }) => {
  const format = () => {
    return Number(price).toLocaleString("en", {
      style: "currency",
      currency: "BDT",
    });
  };

  if (isNaN(Number(price))) {
    return null;
  }

  return <span className={className}>{format()}</span>;
};

export default PriceTag;
