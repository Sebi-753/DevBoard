"use client";

import { updateMe } from "@/lib/data-services-user";
import { User } from "@/types/user";
import { BriefcaseBusiness, Code2, Plus, Save, Trash2 } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import ErrorInput from "../components/ErrorInput";

type Props = {
  user: User;
};

export type UpdatedProfessionalProfile = {
  bio: string;
  skills: string[];
  availability: "part-time" | "full-time";
};

export default function ProfessionalProfileForm({ user }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<UpdatedProfessionalProfile>({
    defaultValues: {
      bio: user.bio ?? "",
      skills: user.skills ?? [],
      availability: user.availability ?? "part-time",
    },
  });

  const [skills, setSkills] = useState<string[]>(user.skills ?? []);
  const [newSkill, setNewSkill] = useState("");
  const [isAddingSkill, setIsAddingSkill] = useState(false);

  function addSkill(skill: string) {
    const trimmedSkill = skill.trim();

    if (
      !trimmedSkill ||
      skills.some(
        (existing) => existing.toLowerCase() === trimmedSkill.toLowerCase(),
      )
    ) {
      return;
    }

    setSkills((current) => [...current, trimmedSkill]);
    setNewSkill("");
  }

  function removeSkill(skillToRemove: string) {
    setSkills((current) => current.filter((skill) => skill !== skillToRemove));
  }

  async function onSubmit(data: UpdatedProfessionalProfile) {
    await updateMe({ ...data, skills }, user._id);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Bio */}
      <section className="rounded-xl bg-white p-5 shadow-xs sm:p-6">
        <div>
          <label
            htmlFor="bio"
            className="mb-2 block text-sm font-medium text-gray-700"
          >
            About me
          </label>

          <textarea
            id="bio"
            rows={5}
            placeholder="Describe your experience, skills, and what you can offer clients..."
            {...register("bio", {
              maxLength: {
                value: 1000,
                message: "Your bio cannot exceed 1000 characters.",
              },
            })}
            className="w-full resize-y rounded-lg border border-[var(--input-border)] bg-[var(--input-bg)] px-3 py-2.5 text-sm transition outline-none focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)]/20"
          />

          {errors.bio?.message && <ErrorInput>{errors.bio.message}</ErrorInput>}

          <p className="mt-2 text-xs text-gray-500">Maximum 1000 characters.</p>
        </div>
      </section>

      {/* Skills */}
      <section className="rounded-xl bg-white p-5 shadow-xs sm:p-6">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--background-secondary)]">
            <Code2 size={20} className="text-[var(--primary)]" />
          </div>

          <div>
            <h3 className="text-base font-semibold text-gray-900">Skills</h3>
            <p className="text-sm text-gray-500">
              Add the skills and technologies you work with.
            </p>
          </div>
        </div>

        {/* Selected skills */}
        <div className="mt-5">
          <p className="mb-3 text-sm font-medium text-gray-700">
            Your skills ({skills.length})
          </p>

          {skills.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {skills.map((skill) => (
                <span
                  key={skill}
                  className="inline-flex items-center gap-2 rounded-full border border-[var(--input-border)] bg-[var(--background)] px-3 py-1.5 text-sm text-gray-700"
                >
                  {skill}

                  <button
                    type="button"
                    onClick={() => removeSkill(skill)}
                    aria-label={`Remove ${skill}`}
                    className="rounded-full p-0.5 text-gray-400 transition hover:bg-red-50 hover:text-red-600"
                  >
                    <Trash2 size={14} />
                  </button>
                </span>
              ))}
            </div>
          ) : (
            <p className="rounded-lg border border-dashed border-gray-300 p-4 text-sm text-gray-500">
              No skills added yet.
            </p>
          )}
        </div>

        {/* Add skill input */}
        <div className="mt-5">
          {isAddingSkill ? (
            <div>
              <label
                htmlFor="newSkill"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Skill name
              </label>

              <div className="flex flex-wrap gap-2">
                <input
                  id="newSkill"
                  type="text"
                  autoFocus
                  value={newSkill}
                  onChange={(event) => setNewSkill(event.target.value)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter") {
                      event.preventDefault();
                      addSkill(newSkill);
                      setIsAddingSkill(false);
                    }

                    if (event.key === "Escape") {
                      setNewSkill("");
                      setIsAddingSkill(false);
                    }
                  }}
                  placeholder="Enter a skill..."
                  className="min-w-0 flex-1 rounded-lg border border-[var(--input-border)] bg-[var(--input-bg)] px-3 py-2.5 text-sm transition outline-none focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)]/20"
                />

                <button
                  type="button"
                  onClick={() => {
                    addSkill(newSkill);
                    setIsAddingSkill(false);
                  }}
                  className="rounded-lg bg-[var(--primary)] px-4 py-2.5 text-sm font-medium text-white transition hover:opacity-90"
                >
                  Add
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setNewSkill("");
                    setIsAddingSkill(false);
                  }}
                  className="rounded-lg border border-gray-200 px-3 py-2.5 text-sm text-gray-600 transition hover:bg-gray-50"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => setIsAddingSkill(true)}
              className="inline-flex items-center gap-2 rounded-lg border border-[var(--input-border)] px-4 py-2.5 text-sm font-medium text-gray-700 transition hover:border-[var(--primary)] hover:text-[var(--primary)]"
            >
              <Plus size={17} />
              Add a skill
            </button>
          )}
        </div>
      </section>

      {/* Work Preferences */}
      <section className="rounded-xl bg-white p-5 shadow-xs sm:p-6">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--background-secondary)]">
            <BriefcaseBusiness size={20} className="text-[var(--primary)]" />
          </div>

          <div>
            <h3 className="text-base font-semibold text-gray-900">
              Work Preferences
            </h3>
            <p className="text-sm text-gray-500">
              Choose your preferred working arrangement.
            </p>
          </div>
        </div>

        <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
          <label className="flex cursor-pointer items-start gap-3 rounded-lg border border-gray-200 p-4 transition hover:bg-gray-50 has-[:checked]:border-[var(--primary)] has-[:checked]:bg-[var(--background-secondary)]">
            <input
              type="radio"
              value="part-time"
              {...register("availability", { required: true })}
              className="mt-1 h-4 w-4 accent-[var(--primary)]"
            />

            <div>
              <p className="text-sm font-medium text-gray-900">Part-time</p>
              <p className="mt-1 text-xs text-gray-500">
                Flexible hours or fewer working hours per week.
              </p>
            </div>
          </label>

          <label className="flex cursor-pointer items-start gap-3 rounded-lg border border-gray-200 p-4 transition hover:bg-gray-50 has-[:checked]:border-[var(--primary)] has-[:checked]:bg-[var(--background-secondary)]">
            <input
              type="radio"
              value="full-time"
              {...register("availability", { required: true })}
              className="mt-1 h-4 w-4 accent-[var(--primary)]"
            />

            <div>
              <p className="text-sm font-medium text-gray-900">Full-time</p>
              <p className="mt-1 text-xs text-gray-500">
                Looking for a full-time working arrangement.
              </p>
            </div>
          </label>
        </div>
      </section>

      {/* Actions */}
      <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
        <button
          type="button"
          onClick={() => window.location.reload()}
          className="rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
        >
          Discard Changes
        </button>

        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-[var(--primary)] px-5 py-2.5 text-sm font-medium text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
        >
          <Save size={17} />
          {isSubmitting ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </form>
  );
}
