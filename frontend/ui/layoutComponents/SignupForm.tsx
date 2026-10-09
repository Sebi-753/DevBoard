"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { CreatedUser } from "@/types/user";
import { useForm } from "react-hook-form";
import isEmail from "validator/lib/isEmail";

import Button from "../components/Button";
import { signUp } from "@/lib/auth";
import ErrorInput from "../components/ErrorInput";

export default function SignupForm() {
  const [error, setError] = useState("");
  const { register, handleSubmit, getValues, reset, formState } =
    useForm<CreatedUser>();
  const router = useRouter();

  const { errors } = formState;

  async function onSubmit(data: CreatedUser) {
    setError("");
    const name = data.name;
    const email = data.email;
    const password = data.password;
    const passwordConfirm = data.passwordConfirm;

    try {
      await signUp({ name, email, password, passwordConfirm });
      reset();
      router.push("/");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Signup failed.");
    }
  }
  function onError() {
    return;
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit, onError)}
      className="mt-6 flex flex-col gap-3"
    >
      <div className="flex flex-col gap-1">
        <label htmlFor="name">Full name</label>
        <input
          type="text"
          id="name"
          {...register("name", {
            required: "The name is required",
            validate: (value: string) => {
              return (
                value.length >= 4 || "Name should be atlest 4 characters long"
              );
            },
          })}
          placeholder="Full name"
          className="w-full rounded-xl border border-transparent bg-[var(--input-bg)] px-4 py-2 transition-[border-color,box-shadow] duration-300 ease-out outline-none focus:border-[var(--input-border)] focus:ring-2 focus:ring-[var(--input-border)]/20"
        />
        {errors?.name?.message && (
          <ErrorInput>{errors.name.message}</ErrorInput>
        )}
      </div>
      <div className="flex flex-col gap-1">
        <label htmlFor="email">Email</label>
        <input
          type="text"
          id="email"
          {...register("email", {
            required: "The email is required",
            validate: (value: string) => {
              return isEmail(value) || "Please enter a valid email";
            },
          })}
          placeholder="example@gmail.com"
          className="w-full rounded-xl border border-transparent bg-[var(--input-bg)] px-4 py-2 transition-[border-color,box-shadow] duration-300 ease-out outline-none focus:border-[var(--input-border)] focus:ring-2 focus:ring-[var(--input-border)]/20"
        />
        {errors?.email?.message && (
          <ErrorInput>{errors.email.message}</ErrorInput>
        )}
      </div>
      <div className="flex flex-col gap-1">
        <label htmlFor="password">Password</label>
        <input
          type="text"
          id="password"
          {...register("password", {
            required: "The password is required",
            validate: (value: string) => {
              return (
                value.length >= 8 ||
                "Password should be atlest 8 characters long"
              );
            },
          })}
          placeholder="••••••••"
          className="w-full rounded-xl border border-transparent bg-[var(--input-bg)] px-4 py-2 transition-[border-color,box-shadow] duration-300 ease-out outline-none focus:border-[var(--input-border)] focus:ring-2 focus:ring-[var(--input-border)]/20"
        />
        {errors?.password?.message && (
          <ErrorInput>{errors.password.message}</ErrorInput>
        )}
      </div>
      <div className="flex flex-col gap-1">
        <label htmlFor="passwordConfirm">Confirm Password</label>
        <input
          type="text"
          id="passwordConfirm"
          {...register("passwordConfirm", {
            required: "The Confirm Password is required",
            validate: (value: string) => {
              return getValues().password === value || "Passwords do not match";
            },
          })}
          placeholder="••••••••"
          className="w-full rounded-xl border border-transparent bg-[var(--input-bg)] px-4 py-2 transition-[border-color,box-shadow] duration-300 ease-out outline-none focus:border-[var(--input-border)] focus:ring-2 focus:ring-[var(--input-border)]/20"
        />
        {errors?.passwordConfirm?.message && (
          <ErrorInput>{errors.passwordConfirm.message}</ErrorInput>
        )}
      </div>

      {error && <p className="text-red-500">{error}</p>}

      <Button type="signup">Sign up</Button>
    </form>
  );
}
