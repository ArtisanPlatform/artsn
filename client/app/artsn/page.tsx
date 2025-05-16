"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/store/useUserStore";

export default function Home() {
  const router = useRouter();
  const { user } = useUserStore();

  useEffect(() => {
    router.push(`/artsn/projects/kanban/${user?.projects[0].id}`);
  }, []);

  return <div>Loading...</div>;
}
