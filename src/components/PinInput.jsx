import React from "react";

const PinInput = ({ className }) => {
  return (
    <input
      name="pin"
      id="pin"
      data-testid="pinInput"
      type="password"
      maxLength="5"
      inputMode="numeric"
      className={`${className}`}
      required
      onInput={(e) => {
        e.target.value = e.target.value.replace(/\D/g, "").slice(0, 5);
      }}
      placeholder="Enter your 5 digit pin"
    />
  );
};

export default PinInput;
