import Button from "../components/Button";

export default function Hero() {
  return (
    <section>
      <header>
        <h2>Hero</h2>
        <h3>Manage projects. Ship better work.</h3>
      </header>
      <main>
        <p>
          DevBoard gives freelancers and clients one simple place to manage
          projects, track tasks, and stay on the same page.
        </p>

        <Button type="signup">Get started</Button>
      </main>
    </section>
  );
}
