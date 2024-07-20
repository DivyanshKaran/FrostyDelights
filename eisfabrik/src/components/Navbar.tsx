import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  return (
    <ul className="navbar flex mx-auto w-[90%] my-[1.2rem] justify-around text-2xl bg rounded-full">
      <div>
        <li className="w-20">
          <Link href="/">
            <Image
              width={50}
              height={50}
              src="/logo.png"
              alt="logo"
              className="rounded-full"
            />
          </Link>
        </li>
      </div>
      <div>
        <li>
          <Link href="/about">About</Link>
        </li>
      </div>
      <div>
        <li>
          <Link href="/blog">Blog</Link>
        </li>
      </div>
      <div>
        <li>
          <Link href="/log-in">Log In</Link>
        </li>
      </div>
      <div>
        <li className="btn btn-primary">
          <Link href="/sign-up">Sign Up</Link>
        </li>
      </div>
    </ul>
  );
}
