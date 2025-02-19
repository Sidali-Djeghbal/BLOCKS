import Link from "next/link";
import Image from "next/image";

export default function Logo() {
  return (
    <Link href="/" className="inline-flex shrink-0" aria-label="TechGeeks-logo">
      <Image
        src={"/images/logo.svg"}
        alt="TechGeeks Logo"
        width={56}
        height={56}
      />
    </Link>
  );
}
