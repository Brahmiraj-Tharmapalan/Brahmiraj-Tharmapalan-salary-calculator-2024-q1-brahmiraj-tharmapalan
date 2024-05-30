import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="bg-green-800">
      <div className="flex-center min-h-screen w-full bg-primary-50 bg-main-img bg-cover bg-fixed bg-center">
        <div className="flex-center gap-5">
          <Image
            src="/assets/images/logo.svg"
            alt="hero"
            width={50}
            height={50}
          />
          <h1 className="text-white font-semibold text-4xl">betalaunch</h1>
        </div>
        <div></div>
        <div>
          <Link href="/salary-calculator" className="text-white font-semibold text-4xl">Salary Calculator</Link>
        </div>
      </div>
    </main>
  );
}
