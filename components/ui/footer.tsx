import Logo from "./logo";
import Image from "next/image";

export default function Footer() {
  return (
    <footer>
      <div className="relative mx-auto max-w-6xl md:pt-8 px-4 sm:px-6">
        {/* Footer illustration */}
        <div
          className="pointer-events-none absolute bottom-0 left-1/2 -z-10 -translate-x-1/2"
          aria-hidden="true"
        >
          <Image
            className="max-w-none"
            src={"/images/footer-illustration.svg"}
            width={1076}
            height={378}
            alt="Footer illustration"
          />
        </div>
        <div className="justify-between pt-8 lg:grid-cols-[repeat(4,minmax(0,140px))_1fr] lg:grid-rows-1 xl:gap-20 items-center">
          <div className="col-span-2 lg:col-span-1 text-center flex flex-col justify-center">
            <div className="mb-3">
              <Logo />
            </div>
            <div className="text-sm">
              <p className="mb-3 text-indigo-200/65">
                © 2025 - TechGeeks.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
