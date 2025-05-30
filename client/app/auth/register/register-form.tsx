"use client";

import type React from "react";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock, Mail, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RegisterFormData, registerSchema } from "@/schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";

export default function RegisterForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormData) => {
    setIsLoading(true);

    try {
      await axios.post("http://localhost:8000/api/auth/register", data);
      router.push("/auth/login");
    } catch (error) {
      console.error("Registration failed", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4">
      <div className="relative">
        <div className="absolute inset-y-0 left-3 bottom-5 flex items-center pointer-events-none">
          <User className="h-5 w-5 text-gray-400" />
        </div>
        <Input
          type="text"
          placeholder="Your username"
          className="pl-10 h-12 rounded-xl bg-gray-50"
          {...register("name")}
        />
        <p className="min-h-[20px] text-red-500 text-sm ml-2">
          {errors.name?.message}
        </p>
      </div>

      <div className="relative">
        <div className="absolute inset-y-0 left-3 bottom-5 flex items-center pointer-events-none">
          <Mail className="h-5 w-5 text-gray-400" />
        </div>
        <Input
          type="email"
          placeholder="Your Email"
          className="pl-10 h-12 rounded-xl bg-gray-50"
          {...register("email")}
        />
        <p className="min-h-[20px] text-red-500 text-sm ml-2">
          {errors.email?.message}
        </p>
      </div>

      <div className="relative">
        <div className="absolute inset-y-0 left-3 bottom-5 flex items-center pointer-events-none">
          <Lock className="h-5 w-5 text-gray-400" />
        </div>
        <Input
          type="password"
          placeholder="Your Password"
          className="pl-10 h-12 rounded-xl bg-gray-50"
          {...register("password")}
        />
        <p className="min-h-[20px] text-red-500 text-sm ml-2">
          {errors.password?.message}
        </p>
      </div>

      <Button
        type="submit"
        className="w-full h-12 rounded-xl bg-red-500 hover:bg-red-600 text-white font-medium"
        disabled={isLoading}
      >
        {isLoading ? "Creating account..." : "Sign Up"}
      </Button>

      <Button
        type="button"
        variant="outline"
        className="w-full h-12 rounded-xl border border-gray-200 font-medium"
      >
        <svg className="mr-2 h-5 w-5" viewBox="0 0 24 24">
          <path
            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            fill="#4285F4"
          />
          <path
            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            fill="#34A853"
          />
          <path
            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            fill="#FBBC05"
          />
          <path
            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            fill="#EA4335"
          />
          <path d="M1 1h22v22H1z" fill="none" />
        </svg>
        Google
      </Button>
    </form>
  );
}
