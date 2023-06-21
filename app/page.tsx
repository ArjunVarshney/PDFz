import Keyboard from "@/components/Keyboard";
import Layout from "@/components/Layout";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen w-full">
      <Layout>
        <div className="max-w-md">
          <h1 className="text-6xl md:text-8xl font-bold">Free Pdf Tools</h1>
          <p className="py-6 text-xl">
            Welcome to our PDF Powerhouse! My website offers an intuitive and
            user-friendly platform for performing essential PDF operations.
          </p>
          <div>
            <Link className="btn btn-primary" href="/pdf">
              Get Started
            </Link>
          </div>
        </div>
        <div className="hidden xl:block ">
          <Keyboard className="shadow-lg" />
        </div>
        <div className="flex-col gap-2 hidden sm:flex xl:hidden">
          <kbd className="kbd kbd-lg bg-primary text-primary-content p-7 px-10">
            P
          </kbd>
          <kbd className="kbd kbd-lg bg-primary text-primary-content p-7 px-10">
            D
          </kbd>
          <kbd className="kbd kbd-lg bg-primary text-primary-content p-7 px-10">
            F
          </kbd>
          <kbd className="kbd kbd-lg bg-primary text-primary-content p-7 px-10">
            Z
          </kbd>
        </div>
      </Layout>
    </main>
  );
}
