"use client";

import { updateMePersonalInfo } from "@/lib/data-services-user";
import { User } from "@/types/user";
import { UserRound, Mail, Camera, Save } from "lucide-react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import isEmail from "validator/lib/isEmail";
import ErrorInput from "../components/ErrorInput";

type Props = { user: User };

export type UpdatedUserPersonalInfo = {
  photo?: string;
  name: string;
  location: string;
  email: string;
};

export default function PersonalInformationForm({ user }: Props) {
  const { register, handleSubmit, formState } =
    useForm<UpdatedUserPersonalInfo>({
      defaultValues: {
        name: user.name ?? "",
        location: user.location ?? "",
        email: user.email ?? "",
        photo: user.photo ?? "",
      },
    });
  const { errors } = formState;
  // console.log(user);

  async function onSubmit(data: UpdatedUserPersonalInfo) {
    await updateMePersonalInfo(data, user._id);
  }
  function onError() {
    return;
  }

  return (
    <form className="space-y-6" onSubmit={handleSubmit(onSubmit, onError)}>
      {/* Profile photo */}
      <div className="rounded-xl bg-white p-5 shadow-xs sm:p-6">
        <h3 className="text-base font-semibold text-gray-900">Profile Photo</h3>

        <div className="mt-4 flex items-center gap-4">
          {user.photo ? (
            <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-full border-4 border-[var(--background-secondary)] bg-[var(--background)] sm:h-28 sm:w-28">
              <Image
                src={user.photo}
                alt="Profile photo"
                fill
                sizes="112px"
                className="object-cover"
                priority
              />
            </div>
          ) : (
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-gray-100">
              <UserRound size={30} className="text-gray-400" />
            </div>
          )}

          <div className="min-w-0">
            <p className="text-sm text-gray-700">Upload a profile picture</p>
            <p className="mt-1 text-xs text-gray-500">
              JPG or PNG, preferably square.
            </p>

            <button
              type="button"
              className="mt-3 inline-flex items-center gap-2 rounded-lg border border-gray-200 px-3 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
            >
              <Camera size={16} />
              Change photo
            </button>
          </div>
        </div>
      </div>

      {/* Basic information */}
      <div className="rounded-xl bg-white p-5 shadow-xs sm:p-6">
        <h3 className="text-base font-semibold text-gray-900">
          Basic Information
        </h3>
        <p className="mt-1 text-sm text-gray-500">
          Update your name and personal details.
        </p>

        <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div>
            <label
              htmlFor="name"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Full name
            </label>
            <input
              id="name"

              {...register("name", {
                required: "The name is required",
                validate: (value: string) => {
                  return (
                    value.length >= 4 ||
                    "Name should be atlest 4 characters long"
                  );
                },
              })}
              type="text"
              placeholder="Your full name"
              className="w-full rounded-lg border border-[var(--input-border)] bg-[var(--input-bg)] px-3 py-2.5 text-sm transition outline-none focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)]/20"
            />
          </div>

          <div>
            <label
              htmlFor="location"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Location
            </label>
            <input
              id="location"
              type="text"
              placeholder="Your location"
              {...register("location")}
              className="w-full rounded-lg border border-[var(--input-border)] bg-[var(--input-bg)] px-3 py-2.5 text-sm transition outline-none focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)]/20"
            />
          </div>
        </div>
      </div>

      {/* Contact information */}
      <div className="rounded-xl bg-white p-5 shadow-xs sm:p-6">
        <h3 className="text-base font-semibold text-gray-900">
          Contact Information
        </h3>
        <p className="mt-1 text-sm text-gray-500">
          Keep your contact details up to date.
        </p>

        <div className="mt-5 space-y-5">
          <div>
            <label
              htmlFor="email"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Email address
            </label>
            <div className="relative">
              <Mail
                size={18}
                className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400"
              />
              <input
                id="email"
                type="email"
                {...register("email", {
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Please enter a valid email",
                  },
                  validate: (value) => {
                    return isEmail(value) || "Please enter a valid email";
                  },
                })}
                placeholder="you@example.com"
                className="w-full rounded-lg border border-[var(--input-border)] bg-[var(--input-bg)] py-2.5 pr-3 pl-10 text-sm transition outline-none focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)]/20"
              />
              {errors?.email?.message && (
                <ErrorInput>{errors.email.message}</ErrorInput>
              )}
            </div>
            <p className="mt-2 text-xs text-gray-500">
              You may need to verify your email after changing it.
            </p>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
        <button
          type="button"
          className="rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
        >
          Cancel
        </button>

        <button
          type="submit"
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-[var(--primary)] px-5 py-2.5 text-sm font-medium text-white transition hover:opacity-90"
        >
          <Save size={17} />
          Save Changes
        </button>
      </div>
    </form>
  );
}
