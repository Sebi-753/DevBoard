import Link from "next/link";

export default function Navbar() {
  return (
    <nav>
      <div>DevBoard</div>
      <ul>
        <li>
          <Link href={"/"}>Features</Link>
        </li>
        <li>
          <Link href={"/"}>How it works</Link>
        </li>
        <li>
          <Link href={"/"}>Pricing</Link>
        </li>
        <li>
          <Link href={"/login"}>Log in</Link>
        </li>
        <li>
          <Link href={"/signup"}>Get started</Link>
        </li>
      </ul>
    </nav>
  );
}
