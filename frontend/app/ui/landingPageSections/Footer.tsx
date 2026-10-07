import Link from "next/link";

export default function Footer() {
  return (
    <footer>
      <header>
        <h2>DevBoard</h2>
        <h3>Simple project management for freelancers and clients.</h3>
      </header>
      <div>
        <h4>Product</h4>
        <ul>
          <li>Features</li>
          <li>How it works</li>
          <li>Pricing</li>
        </ul>
      </div>
      <div>
        <h4>Account</h4>
        <ul>
          <li>
            <Link href={"/login"}>Log in</Link>
          </li>
          <li>
            <Link href={"/sinup"}>Sign up</Link>
          </li>
        </ul>
      </div>
      <div>© 2026 DevBoard. All rights reserved.</div>
    </footer>
  );
}
