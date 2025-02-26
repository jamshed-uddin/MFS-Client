"use client";

import React from "react";
import Button from "./Button";
import PinInput from "./PinInput";

const RegisterForm = ({ submitFunc, submitInProgress = false }) => {
  return (
    <div>
      <form onSubmit={submitFunc} className="space-y-2">
        <div className="flex flex-col space-y-1">
          <label htmlFor="name" className="font-medium text-sm">
            Name
          </label>
          <input
            name="name"
            type="text"
            className="loginRegisterInputStyle"
            placeholder="Enter your email "
            required
          />
        </div>
        <div className="flex flex-col space-y-1">
          <label htmlFor="email" className="font-medium text-sm">
            Email
          </label>
          <input
            name="email"
            type="text"
            className="loginRegisterInputStyle"
            placeholder="Enter your email "
            required
          />
        </div>
        <div className="flex flex-col space-y-1">
          <label htmlFor="mobileNumber" className="font-medium text-sm">
            Mobile number
          </label>
          <input
            name="mobileNumber"
            type="text"
            className="loginRegisterInputStyle"
            placeholder="Enter mobile number "
            required
          />
        </div>
        <div className="flex flex-col space-y-1">
          <label htmlFor="nid" className="font-medium text-sm">
            NID Number
          </label>
          <input
            name="nid"
            type="text"
            className="loginRegisterInputStyle"
            placeholder="Enter your NID number "
            required
          />
        </div>
        <div className="flex flex-col space-y-1">
          <label htmlFor="role" className="font-medium text-sm">
            Account type
          </label>
          <select
            name="role"
            id="role"
            className="loginRegisterInputStyle w-full"
            required
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        <div className="flex flex-col space-y-1">
          <label htmlFor="pin" className="font-medium text-sm">
            Pin
          </label>
          <PinInput />
        </div>
        <Button
          type="submit"
          disabled={submitInProgress}
          loading={submitInProgress}
        >
          Register
        </Button>
      </form>
    </div>
  );
};

export default RegisterForm;
