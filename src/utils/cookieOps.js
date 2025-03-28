import Cookies from "js-cookie";

export const getCookies = (key) => {
  return Cookies.get(key) ? JSON.parse(Cookies.get(key)) : {};
};

export const setCookie = (key, value) => {
  Cookies.set(key, JSON.stringify(value));
};
