import Cookies from "js-cookie";

export const requestClient = async (url, options = {}) => {
  const serverBaseUrl = process.env.NEXT_PUBLIC_SERVER_URL;
  const apiUrl = `${serverBaseUrl}${url}`;
  const token = Cookies.get("token");

  try {
    const response = await fetch(apiUrl, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        ...(options.headers || {}),
      },
    });

    const responseData = await response.json().catch(() => ({}));

    if (!response.ok) {
      const errorMessage = responseData.message || response.statusText;
      throw new Error(errorMessage);
    }

    return responseData; // Return parsed response data
  } catch (error) {
    console.error("Request Error:", error.message);
    throw error;
  }
};
