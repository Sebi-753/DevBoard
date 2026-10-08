import { cookies } from "next/headers";

export async function getMe() {
  const cookieStore = await cookies();

  const jwt = cookieStore.get("jwt");

  if (!jwt) {
    return null;
  }
  const res = await fetch("http://localhost:8000/api/v1/users/me", {
    method: "GET",
    headers: {
      Cookie: `jwt=${jwt.value}`,
    },
  });
  const data = await res.json();

  if (!res.ok) {
    return null;
  }

  return data;
}
