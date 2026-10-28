import { getMe } from "@/lib/server-data-services";
import { User } from "@/types/user";
import H2 from "@/ui/components/H2";
import PersonalInformationForm from "@/ui/layoutComponents/PersonalInformationForm";

export default async function Page() {
  const user: User = await getMe();
  return (
    <section className="min-h-screen bg-[var(--background-secondary)] px-4 py-8 sm:px-6 sm:py-10">
      <div className="mx-auto max-w-3xl space-y-6">
        <header className="text-center">
          <H2>Personal Information</H2>
          <p className="mt-2 text-sm text-gray-500">
            Manage your personal details and contact information.
          </p>
        </header>
        <PersonalInformationForm user={user} />
      </div>
    </section>
  );
}
