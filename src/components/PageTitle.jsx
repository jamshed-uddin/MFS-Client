import React from "react";

const PageTitle = ({ children, className }) => {
  return (
    <h3 className={`text-lg font-medium mb-4 ${className}`}>{children}</h3>
  );
};

export default PageTitle;
