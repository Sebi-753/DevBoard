import { cookies } from "next/headers";

export const getUserTasks = async function name() {
  try {
    const cookieStore = await cookies();
    const jwt = cookieStore.get("jwt");

    if (!jwt) throw new Error("You are nor logged in");

    const res = await fetch(`${process.env.API_URL}/tasks`, {
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

    return data.tasks;
  } catch (err) {
    console.error(err);
  }
};
