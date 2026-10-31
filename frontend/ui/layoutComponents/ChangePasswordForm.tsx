"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { Eye, EyeOff, LockKeyhole } from "lucide-react";
import { updatePassword } from "@/lib/data-services-user";

export type ChangePasswordInputs = {
  currentPassword: string;
  newPassword: string;
  passwordConfirm: string;
};

export default function ChangePasswordForm() {
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<ChangePasswordInputs>();

  const newPassword = watch("newPassword");

  const onSubmit = async (data: ChangePasswordInputs) => {
    try {
      setIsLoading(true);

      // Connect your change password API endpoint here.

      await updatePassword(data);
      reset();
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const togglePassword = (field: keyof typeof showPasswords) => {
    setShowPasswords((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const inputClass =
    "w-full rounded-lg border border-border bg-background-secondary px-4 py-3 pr-12 text-sm outline-none transition focus:border-primary";

  return (
    <form
      onSubmit={handleSubmit(onSubmit, (errors) =>
        console.log("Validation errors:", errors),
      )}
      className="mx-auto mt-10 flex w-full max-w-xl flex-col gap-6"
    >
      {/* Current password */}
      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium">Current password</label>

        <div className="relative">
          <input
            type={showPasswords.current ? "text" : "password"}
            placeholder="Enter your current password"
            className={inputClass}
            {...register("currentPassword", {
              required: "Current password is required",
            })}
          />

          <button
            type="button"
            onClick={() => togglePassword("current")}
            className="text-muted-foreground absolute top-1/2 right-4 -translate-y-1/2"
          >
            {showPasswords.current ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>

        {errors.currentPassword && (
          <p className="text-xs text-red-500">
            {errors.currentPassword.message}
          </p>
        )}
      </div>

      {/* New password */}
      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium">New password</label>

        <div className="relative">
          <input
            type={showPasswords.new ? "text" : "password"}
            placeholder="Enter your new password"
            className={inputClass}
            {...register("newPassword", {
              required: "New password is required",
              minLength: {
                value: 8,
                message: "Password must contain at least 8 characters",
              },
            })}
          />

          <button
            type="button"
            onClick={() => togglePassword("new")}
            className="text-muted-foreground absolute top-1/2 right-4 -translate-y-1/2"
          >
            {showPasswords.new ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>

        {errors.newPassword && (
          <p className="text-xs text-red-500">{errors.newPassword.message}</p>
        )}
      </div>

      {/* Confirm password */}
      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium">Confirm new password</label>

        <div className="relative">
          <input
            type={showPasswords.confirm ? "text" : "password"}
            placeholder="Confirm your new password"
            className={inputClass}
            {...register("passwordConfirm", {
              required: "Please confirm your new password",
              validate: (value) =>
                value === newPassword || "Passwords do not match",
            })}
          />

          <button
            type="button"
            onClick={() => togglePassword("confirm")}
            className="text-muted-foreground absolute top-1/2 right-4 -translate-y-1/2"
          >
            {showPasswords.confirm ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>

        {errors.passwordConfirm && (
          <p className="text-xs text-red-500">
            {errors.passwordConfirm.message}
          </p>
        )}
      </div>

      {/* Password requirements */}
      <div className="border-border bg-background-secondary rounded-lg border p-4">
        <div className="flex items-center gap-2 text-sm font-medium">
          <LockKeyhole size={16} />
          Password requirements
        </div>

        <p className="text-muted-foreground mt-2 text-xs">
          Your password must contain at least 8 characters.
        </p>
      </div>

      {/* Submit */}

      <button
        type="submit"
        disabled={isLoading}
        className="mt-4 w-full rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700"
      >
        {isLoading ? "Updating..." : "Update password"}
      </button>
    </form>
  );
}
