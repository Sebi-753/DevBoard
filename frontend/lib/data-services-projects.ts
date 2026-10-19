import { cookies } from "next/headers";

export const getUserProjects = async function () {
  try {
    const cookieStore = await cookies();
    const jwt = cookieStore.get("jwt");

    if (!jwt) return [];

    const res = await fetch(`${process.env.API_URL}/projects`, {
      method: "GET",
      headers: {
        Cookie: `jwt=${jwt.value}`,
      },
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch projects");
    }

    const data = await res.json();

    return data.data.projects;
  } catch (err) {
    console.error(err);
    throw err;
  }
};
