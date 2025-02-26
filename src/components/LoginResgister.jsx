"use client";

import React, { useState } from "react";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

const LoginResgister = () => {
  const [inDisplay, setInDisplay] = useState("login");
  return (
    <div>
      <h3 className="text-lg font-semibold mb-1">
        {inDisplay.charAt(0).toUpperCase() + inDisplay.slice(1)}
      </h3>
      {inDisplay === "login" ? <LoginForm /> : <RegisterForm />}
      <h3 className="mt-1">
        {inDisplay === "login" ? (
          <>
            <span>Don't have an account?</span>
            <span
              className={"underline text-blue-500 cursor-pointer"}
              onClick={() => setInDisplay("register")}
            >
              Register
            </span>
          </>
        ) : (
          <>
            <span>Already have an account?</span>
            <span
              className={"underline text-blue-500 cursor-pointer"}
              onClick={() => setInDisplay("login")}
            >
              Login
            </span>
          </>
        )}
      </h3>
    </div>
  );
};

export default LoginResgister;
