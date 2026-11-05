"use server";

import { TaskFormData } from "@/ui/layoutComponents/AddTaskForm";
import { EditTaskData } from "@/ui/layoutComponents/EditTaskForm";
import { cookies } from "next/headers";

export const getTask = async function (id: string) {
  try {
    const cookieStore = await cookies();
    const jwt = cookieStore.get("jwt");

    if (!jwt) throw new Error("You are nor logged in");

    const res = await fetch(`${process.env.API_URL}/tasks/${id}`, {
      method: "get",
      headers: {
        Cookie: `jwt=${jwt.value}`,
      },
      cache: "no-store",
    });

    if (!res.ok) throw new Error("Somenting went wrong!");
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

export const updateTask = async function (
  updatedTask: Partial<EditTaskData>,
  taskId: string,
) {
  try {
    const cookieStore = await cookies();
    const jwt = cookieStore.get("jwt");

    if (!jwt) throw new Error("You are not logged in");

    const res = await fetch(`${process.env.API_URL}/tasks/${taskId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Cookie: `jwt=${jwt.value}`,
      },
      body: JSON.stringify(updatedTask),
      cache: "no-store",
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "Failed to update task");
    }

    return data;
  } catch (err) {
    throw err;
  }
};
export const createTask = async function (
  task: TaskFormData,
  projectId: string,
) {
  const cookieStore = await cookies();
  const jwt = cookieStore.get("jwt");

  if (!jwt) throw new Error("You are not logged in");

  const res = await fetch(
    `${process.env.API_URL}/projects/${projectId}/tasks`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: `jwt=${jwt.value}`,
      },
      body: JSON.stringify(task),
      cache: "no-store",
    },
  );
  if (!res.ok) throw new Error("Failed to create the task");

  const data = await res.json();

  return data.task;
};
