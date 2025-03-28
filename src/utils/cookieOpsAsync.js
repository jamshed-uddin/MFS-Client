import { cookies } from "next/headers";

export const getCookiesAsync = async (key) => {
  const cookieStore = await cookies();
  const cookie = cookieStore.get(key);

  return cookie ? JSON.parse(cookie.value) : {};
};
