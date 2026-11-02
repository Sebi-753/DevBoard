"use server";

import { cookies } from "next/headers";
import { Comment } from "@/types/comment";

export const getTaskComments = async function (taskId: string) {
  try {
    const cookieStore = await cookies();

    const res = await fetch(`${process.env.API_URL}/tasks/${taskId}/comments`, {
      headers: {
        Cookie: cookieStore.toString(),
      },
      cache: "no-store",
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "Failed to fetch comments");
    }

    return data.data.comments as Comment[];
  } catch (err) {
    throw err;
  }
};
export const deleteComment = async function (commentId: string) {
  const cookieStore = await cookies();
  const jwt = cookieStore.get("jwt");

  if (!jwt) {
    throw new Error("You are not logged in");
  }

  const res = await fetch(`${process.env.API_URL}/comments/${commentId}`, {
    method: "DELETE",
    headers: {
      Cookie: `jwt=${jwt.value}`,
    },
    cache: "no-store",
  });

  if (!res.ok) {
    const data = await res.json();
    throw new Error(data.message || "Failed to delete the comment");
  }
};
export const createComment = async function (
  taskId: string,
  trimmedText: string,
) {
  const cookieStore = await cookies();
  const jwt = cookieStore.get("jwt");

  if (!jwt) {
    throw new Error("You are not logged in");
  }

  const res = await fetch(`${process.env.API_URL}/tasks/${taskId}/comments`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Cookie: `jwt=${jwt.value}`,
    },
    body: JSON.stringify({ text: trimmedText }),
    cache: "no-store",
  });

  if (!res.ok) {
    const data = await res.json();
    throw new Error(data.message || "Failed to post the comment!");
  }

  const data = await res.json();

  return data;
};
