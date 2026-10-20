import { cookies } from "next/headers";

export async function getUserProjects() {
  try {
    const cookieStore = await cookies();
    const jwt = cookieStore.get("jwt");

    if (!jwt) throw new Error("You are not loggedin");

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
}
export async function getProject(id: string) {
  try {
    const cookieStore = await cookies();
    const jwt = cookieStore.get("jwt");
    if (!jwt) throw new Error("You are not loggedin");

    const res = await fetch(`${process.env.API_URL}/projects/${id}`, {
      method: "GET",
      headers: {
        Cookie: `jwt=${jwt.value}`,
      },
      cache: "no-store",
    });
    const data = await res.json();

    return data.data;
  } catch (err) {
    console.error(err);
  }
}
export async function getProjctsTasks(projectId: string) {
  try {
    const cookieStore = await cookies();
    const jwt = cookieStore.get("jwt");
    if (!jwt) throw new Error("You are not loggedin");

    const res = await fetch(
      `${process.env.API_URL}/projects/${projectId}/tasks`,
      {
        method: "GET",
        headers: {
          Cookie: `jwt=${jwt.value}`,
        },
        cache: "no-store",
      },
    );
    const data = await res.json();

    return data.tasks;
  } catch (err) {
    console.error(err);
  }
}
