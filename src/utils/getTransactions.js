import { getCookiesAsync } from "./cookieOpsAsync";

const { requestClient } = require("./requestClient");

const getTransactions = async (url) => {
  const { token } = await getCookiesAsync("session");
  console.log("token", token);

  return await requestClient(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export default getTransactions;
