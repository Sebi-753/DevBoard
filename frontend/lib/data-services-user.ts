"use server";

import { UpdatedUserPersonalInfo } from "@/ui/layoutComponents/PersonalInformationForm";
import { cookies } from "next/headers";

export const updateMePersonalInfo = async function (
  data: UpdatedUserPersonalInfo,
  id: string,
) {
  try {
    const cookieStore = await cookies();
    const jwt = cookieStore.get("jwt");

    if (!jwt) {
      throw new Error("You are not logged in");
    }

    console.log("API URL:", `${process.env.API_URL}/users/${id}`);
    console.log("pula");

    const res = await fetch(`${process.env.API_URL}/users/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Cookie: `jwt=${jwt.value}`,
      },
      body: JSON.stringify(data),
      cache: "no-store",
    });

    const responseData = await res.json();

    if (!res.ok) {
      throw new Error(responseData.message || "Failed to update user");
    }

    return responseData;
  } catch (err) {
    console.error(err);
    throw err;
  }
};
