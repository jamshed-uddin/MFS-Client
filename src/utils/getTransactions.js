const { cookies } = require("next/headers");
const { requestClient } = require("./requestClient");

const getTransactions = async (url = "/transactions?limit=10") => {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  return await requestClient(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export default getTransactions;
