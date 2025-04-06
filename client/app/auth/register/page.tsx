import Image from "next/image";
import Link from "next/link";
import { Instagram, Send } from "lucide-react";
import RegisterForm from "./register-form";

export default function RegisterPage() {
  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-gray-50 p-4">
      <div className="relative w-full max-w-4xl overflow-hidden rounded-3xl bg-white p-8 shadow-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Image src={"/artsn-logo.png"} width={100} height={30} alt="" />
          </div>
          <Link
            href="#"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-900"
          >
            <Send className="h-5 w-5 text-white" />
          </Link>
        </div>

        <div className="flex">
          <div className="hidden w-1/4 md:block content-center">
            <div className="h-48 w-48">
              <Image
                src="/picachu.jpg"
                alt="Artisan crafting"
                width={200}
                height={200}
                className="object-contain"
              />
            </div>
          </div>

          <div className="w-full px-4 lg:w-1/2">
            <div className="mx-auto max-w-md">
              <h1 className="text-3xl font-bold">Lets Start Creating</h1>
              <p className="mt-2 text-gray-600">
                Please login or register to continue
              </p>

              <RegisterForm />

              <div className="mt-4 text-center text-sm text-gray-600">
                Don't have an account?{" "}
                <Link
                  href="/auth/register"
                  className="font-medium text-red-600"
                >
                  Register
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
