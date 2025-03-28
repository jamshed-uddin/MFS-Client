"use client";

import React from "react";
import Button from "./Button";
import PinInput from "./PinInput";

const LoginForm = ({ submitFunc, submitInProgress }) => {
  return (
    <div>
      <form onSubmit={submitFunc} className="space-y-2" data-testid="loginForm">
        <div className="flex flex-col space-y-1">
          <label htmlFor="emailOrMobileNumber" className="font-medium text-sm">
            Email or Mobile number
          </label>
          <input
            name="emailOrMobileNumber"
            type="text"
            id="emailOrMobileNumber"
            className="loginRegisterInputStyle"
            placeholder="Enter email or mobile number "
            required
          />
        </div>
        <div className="flex flex-col space-y-1">
          <label htmlFor="pin" className="font-medium text-sm">
            Pin
          </label>
          <PinInput className={"loginRegisterInputStyle"} />
        </div>
        <Button
          type="submit"
          loading={submitInProgress}
          disabled={submitInProgress}
        >
          Login
        </Button>
      </form>
    </div>
  );
};

export default LoginForm;
