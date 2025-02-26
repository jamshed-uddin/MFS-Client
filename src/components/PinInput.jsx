import React from "react";

const PinInput = ({ className }) => {
  return (
    <input
      name="pin"
      type="text"
      maxLength="5"
      inputMode="numeric"
      className={`loginRegisterInputStyle ${className}`}
      required
      onInput={(e) => {
        e.target.value = e.target.value.replace(/\D/g, "").slice(0, 5);
      }}
      placeholder="Enter your 5 digit pin"
    />
  );
};

export default PinInput;
