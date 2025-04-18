"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("access_token");

    if (token) {
      router.push("/artsn");
    } else {
      router.push("/auth/login");
    }
  }, []);

  return <div>Loading...</div>;
}
