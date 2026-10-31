import H2 from "@/ui/components/H2";
import H3 from "@/ui/components/H3";
import ChangePasswordForm from "@/ui/layoutComponents/ChangePasswordForm";

export default function page() {
  return (
    <section className="px-8 py-10">
      <header className="text-center">
        <H2>Change password</H2>
        <H3>Keep your account secure</H3>
      </header>
      <ChangePasswordForm />
    </section>
  );
}
