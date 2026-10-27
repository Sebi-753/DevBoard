import { cookies } from "next/headers";

export const getTask = async function (id: string) {
  try {
    const cookieStore = await cookies();
    const jwt = cookieStore.get("jwt");

    if (!jwt) throw new Error("You are nor logged in");

    // const res = await fetch(`${process.env.API_URL}/tasks/${id}`, {
    const res = await fetch(`${process.env.API_URL}/tasks`, {
      method: "get",
      headers: {
        Cookie: `jwt=${jwt.value}`,
      },
      cache: "no-store",
    });
    console.log(res);
    // if (!res.ok) throw new Error("Somenting went wrong!");

    const data = await res.json();

    return data;
  } catch (err) {
    console.error(err);
  }
};
export const getUserTasks = async function () {
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
