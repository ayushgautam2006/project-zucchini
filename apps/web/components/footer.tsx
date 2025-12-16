import Link from "next/link";

export default function Footer() {
  return (
    <footer className="text-sm text-black bg-[#eff6ff] w-full flex  items-center justify-center py-4 flex-col gap-4">
      <div className="flex md:flex-row flex-col items-center justify-center gap-4 ">
        <Link href="/" className="hover:underline">
          Home
        </Link>
        <Link href="/terms-and-conditions" className="hover:underline">
          Terms and Conditions
        </Link>
        <Link href="/privacy-policy" className="hover:underline">
          Privacy Policy
        </Link>
        <Link href="/refund-policy" className="hover:underline">
          Refund Policy
        </Link>
        <Link href="/code-of-conduct" className="hover:underline">
          Code of Conduct
        </Link>
      </div>

      <a href="https://gdsc-nitr.netlify.app" target="_blank" rel="noopener noreferrer">
        With ❤️ by DSC NIT Rourkela
      </a>
    </footer>
  );
}
