"use client";

import initApp from "@/lib/initApp";
import { useEffect, useState } from "react";

const AppInitProvider = ({ children }: { children: React.ReactNode }) => {
  const [ready, setReady] = useState(false);
  const start = async () => {
    await initApp();
    setReady(true);
  };

  useEffect(() => {
    start();
  }, []);

  if (!ready) return null;

  return <>{children}</>;
};

export default AppInitProvider;
