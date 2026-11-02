import { getMe } from "@/lib/data-services-user";
import { User } from "@/types/user";
import DeleteAccountForm from "@/ui/layoutComponents/DeleteAccountForm";

export default async function page() {
  const user: User = await getMe();
  return (
    <div className="flex flex-col gap-6 px-8 py-10">
      <div className="text-center">
        <h1 className="text-2xl font-semibold">Delete account</h1>
        <p className="text-muted-foreground mt-2 text-sm">
          Permanently delete your DevBoard account and personal information.
        </p>
      </div>

      <DeleteAccountForm userId={user._id} />
    </div>
  );
}
