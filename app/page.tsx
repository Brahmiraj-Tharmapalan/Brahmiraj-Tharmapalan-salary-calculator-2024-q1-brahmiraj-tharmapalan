import { Button } from "@nextui-org/button";
import { Tooltip } from "@nextui-org/tooltip";
import Image from "next/image";
import Link from "next/link";
import { FaGithub } from "react-icons/fa";
import { FaCalculator } from "react-icons/fa";

export default function Home() {
  return (
    <main className="">
      <div className="flex-center min-h-screen w-full bg-emerald-950 bg-main-bg bg-cover bg-fixed bg-center flex-col gap-16">
        <div className="flex-center gap-5">
          <Image
            src="/assets/images/logo.svg"
            alt="hero"
            width={50}
            height={50}
          />
          <Image
            src="/assets/images/name.png"
            alt="name"
            width={150}
            height={150}
          />
        </div>
        <div className="text-white font-semibold text-4xl">
          Associate Software Engineer
        </div>
        <div className="flex flex-col justify-center items-center gap-16">
          <Tooltip showArrow={true} color="secondary" content="Github repo">
            <a
              href="https://github.com/Brahmiraj-Tharmapalan/salary-calculator-2024-q1-brahmiraj-tharmapalan"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button isIconOnly color="secondary" aria-label="GitHub">
                <FaGithub className="w-7 h-7" />
              </Button>
            </a>
          </Tooltip>
          <Tooltip showArrow={true} color="success" content="Salary Calculator">
            <Link href="/salary-calculator">
              <Button
                isIconOnly
                radius="full"
                className="bg-gradient-to-tr from-pink-500 to-yellow-500 text-white shadow-lg"
              >
                <FaCalculator className="w-7 h-7" />
              </Button>
            </Link>
          </Tooltip>
        </div>
      </div>
    </main>
  );
}
