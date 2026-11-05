"use client";

import { useForm } from "react-hook-form";
import { useState } from "react";
import { Loader2, Plus } from "lucide-react";
import type { Client } from "@/app/dashboard/addProject/page";
import { createProject } from "@/lib/data-services-projects";
import { useRouter } from "next/navigation";

export type ProjectFormData = {
  name: string;
  description: string;
  client: string;
  buget: number;
  deadline?: string;
  coverImage?: string;
};

type Props = {
  clients: Client[];
};

export default function AddProjectForm({ clients }: Props) {
  const router = useRouter();
  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ProjectFormData>();

  async function onSubmit(data: ProjectFormData) {
    try {
      setError("");
      console.log(data);
      await createProject({ ...data, deadline: data.deadline || undefined });
      reset();
      router.push("/dashboard/projects");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    }
  }

  const inputStyle =
    "w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100";

  const labelStyle = "mb-2 block text-sm font-medium text-gray-700";

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mx-auto mt-10 flex w-full max-w-2xl flex-col gap-6 rounded-2xl border border-gray-200 bg-white p-8 shadow-sm"
    >
      {/* Project name */}
      <div>
        <label className={labelStyle}>Project name</label>
        <input
          {...register("name", {
            required: "Project name is required",
            minLength: {
              value: 3,
              message: "Name must contain at least 3 characters",
            },
          })}
          placeholder="e.g. Website redesign"
          className={inputStyle}
        />
        {errors.name && (
          <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>
        )}
      </div>

      {/* Description */}
      <div>
        <label className={labelStyle}>Description</label>
        <textarea
          {...register("description", {
            required: "Description is required",
            minLength: {
              value: 10,
              message: "Description must contain at least 10 characters",
            },
          })}
          rows={4}
          placeholder="Describe the project and its objectives..."
          className={`${inputStyle} resize-none`}
        />
        {errors.description && (
          <p className="mt-1 text-sm text-red-500">
            {errors.description.message}
          </p>
        )}
      </div>

      {/* Client */}
      <div>
        <label className={labelStyle}>Client</label>
        <select
          {...register("client", {
            required: "Please select a client",
          })}
          defaultValue=""
          className={inputStyle}
        >
          <option value="" disabled>
            Select a client
          </option>
          {clients.map((client) => (
            <option key={client._id} value={client._id}>
              {client.name}
            </option>
          ))}
        </select>
        {errors.client && (
          <p className="mt-1 text-sm text-red-500">{errors.client.message}</p>
        )}
      </div>

      {/* Budget and deadline */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <label className={labelStyle}>Budget (€)</label>
          <input
            type="number"
            step="0.01"
            {...register("buget", {
              required: "Budget is required",
              valueAsNumber: true,
              min: {
                value: 0,
                message: "Budget cannot be negative",
              },
            })}
            placeholder="1500"
            className={inputStyle}
          />
          {errors.buget && (
            <p className="mt-1 text-sm text-red-500">{errors.buget.message}</p>
          )}
        </div>

        <div>
          <label className={labelStyle}>Deadline</label>
          <input type="date" {...register("deadline")} className={inputStyle} />
        </div>
      </div>

      {/* Cover image */}
      <div>
        <label className={labelStyle}>Cover image URL</label>
        <input
          {...register("coverImage")}
          placeholder="https://example.com/image.jpg"
          className={inputStyle}
        />
      </div>

      {/* Error */}
      {error && (
        <p className="rounded-lg bg-red-50 p-3 text-sm text-red-600">{error}</p>
      )}

      {/* Submit */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isSubmitting ? (
          <>
            <Loader2 size={18} className="animate-spin" />
            Creating project...
          </>
        ) : (
          <>
            <Plus size={18} />
            Create project
          </>
        )}
      </button>
    </form>
  );
}
