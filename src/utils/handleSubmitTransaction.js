import { requestClient } from "./requestClient";

const handleSubmitTransaction = async (url, data) => {
  const res = await requestClient(`/transactions${url}`, {
    method: "POST",
    body: JSON.stringify(data),
  });

  return res;
};

export default handleSubmitTransaction;
