import React from "react";

const Button = ({ children, className, loading, ...props }) => {
  return (
    <div className="relative">
      <button
        {...props}
        className={`btn btn-outline btn-md w-full rounded-xl disabled:btn-disabled  ${className}`}
      >
        {children}
      </button>
      {loading && (
        <span className="loading loading-spinner loading-md absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></span>
      )}
    </div>
  );
};

export default Button;
