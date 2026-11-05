"use server";

import { ChangePasswordInputs } from "@/ui/layoutComponents/ChangePasswordForm";
import { UpdatedUserPersonalInfo } from "@/ui/layoutComponents/PersonalInformationForm";
import { UpdatedProfessionalProfile } from "@/ui/layoutComponents/ProfessionalProfileForm";
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

  return data.user;
}

export const updateMe = async function (
  data: UpdatedUserPersonalInfo | UpdatedProfessionalProfile,
  id: string,
) {
  try {
    const cookieStore = await cookies();
    const jwt = cookieStore.get("jwt");

    if (!jwt) {
      throw new Error("You are not logged in");
    }

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
export const updatePassword = async function (data: ChangePasswordInputs) {
  const cookieStore = await cookies();
  const jwt = cookieStore.get("jwt");

  if (!jwt) {
    throw new Error("You are not logged in");
  }

  const res = await fetch(`${process.env.API_URL}/users/updateMyPassword`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Cookie: `jwt=${jwt.value}`,
    },
    body: JSON.stringify(data),
    cache: "no-store",
  });

  const resData = await res.json();

  if (!res.ok) {
    throw new Error(resData.message || "Failed to update password");
  }

  return resData;
};

export const deleteMe = async function (userId: string) {
  try {
    const cookieStore = await cookies();
    const jwt = cookieStore.get("jwt");

    if (!jwt) {
      throw new Error("You are not logged in");
    }

    const res = await fetch(`${process.env.API_URL}/users/${userId}`, {
      method: "DELETE",
      headers: {
        Cookie: `jwt=${jwt.value}`,
      },
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to delete account");
    }

    return true;
  } catch (err) {
    throw err;
  }
};
export const getUsersClients = async function () {
  const cookieStore = await cookies();
  const jwt = cookieStore.get("jwt");

  if (!jwt) {
    throw new Error("You are not logged in");
  }

  const res = await fetch(`${process.env.API_URL}/users/clients`, {
    method: "GET",
    headers: {
      Cookie: `jwt=${jwt.value}`,
    },
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("There was an error getting the clients");
  }

  const data = await res.json();

  return data.data.clients;
};
export const getClients = async function () {
  const cookieStore = await cookies();
  const jwt = cookieStore.get("jwt");

  if (!jwt) {
    throw new Error("You are not logged in");
  }
  const res = await fetch(`${process.env.API_URL}/users/getClients`, {
    method: "GET",
    headers: {
      Cookie: `jwt=${jwt.value}`,
    },
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error("Faild to get the clients");
  }
  const data = await res.json();
  return data.users;
};
