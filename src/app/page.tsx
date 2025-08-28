"use client";
import { GitoLoader } from "@/components/Loader";
import { useEffect, useState } from "react";

export default function Home() {
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen font-sans bg-gray-900 text-gray-100">
      <GitoLoader isLoading={loading} />

      <div className="p-8 text-center">
        <h1 className="mb-4 text-4xl font-bold">GitHub User Search</h1>
        <p className="text-lg text-gray-400">
          Your content will appear here once loading is complete.
        </p>
      </div>
    </div>
  );
}
