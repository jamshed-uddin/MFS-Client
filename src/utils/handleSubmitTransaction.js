import Cookies from "js-cookie";

const handleSubmitTransaction = async (url, data) => {
  const token = Cookies.get("token");

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/transactions/${url}`,
    {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    }
  );

  return res.json();
};

export default handleSubmitTransaction;
