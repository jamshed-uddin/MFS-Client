"use client";

import React, { useState } from "react";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import { requestClient } from "@/utils/requestClient";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

const LoginResgister = () => {
  const router = useRouter();
  const [inDisplay, setInDisplay] = useState("login");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    setError("");
    e.preventDefault();
    console.log(process.env.NEXT_PUBLIC_SERVER_URL);
    const target = e.currentTarget;
    const formData = new FormData(target);
    const credentials = Object.fromEntries(formData);
    if (credentials.pin.length < 5) {
      return setError("Pin length must be 5");
    }

    try {
      setLoading(true);
      console.log("inside try block");
      const res = await requestClient("/users/login", {
        method: "POST",
        body: JSON.stringify(credentials),
      });
      console.log(res);
      Cookies.set("token", res?.data?.token);
      router.push("/wallet");
      // const res = await fetch(
      //   `${process.env.NEXT_PUBLIC_SERVER_URL}/users/login`,
      //   {
      //     method: "POST",
      //     body: JSON.stringify(credentials),
      //     headers: {
      //       "Content-Type": "application/json",
      //     },
      //   }
      // );

      // const data = res.json();
      // console.log(data);
    } catch (error) {
      console.log(error);
      setError(error?.message);
    } finally {
      setLoading(false);
    }

    console.log(credentials);
  };

  const handleRegister = async (e) => {
    setError("");
    e.preventDefault();
    const target = e.currentTarget;

    const formData = new FormData(target);
    const userInfo = Object.fromEntries(formData);
    if (userInfo.pin.length < 5) {
      return setError("Pin length must be 5");
    }

    try {
      setLoading(true);

      const res = await requestClient("/users/register", {
        method: "POST",
        body: JSON.stringify(userInfo),
      });
      console.log(res);
      Cookies.set("token", res?.data?.token);
      router.push("/wallet");
    } catch (error) {
      console.log(error);
      setError(error?.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h3 className="text-lg font-semibold mb-1">
        {inDisplay.charAt(0).toUpperCase() + inDisplay.slice(1)}
      </h3>
      {inDisplay === "login" ? (
        <LoginForm submitFunc={handleLogin} submitInProgress={loading} />
      ) : (
        <RegisterForm submitFunc={handleRegister} submitInProgress={loading} />
      )}

      <span className="text-red-500">{error}</span>
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
