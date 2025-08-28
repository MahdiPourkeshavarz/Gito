"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SearchBar from "../components/SearchBar";
import SuggestionBar from "../components/SuggestionBar";
import UserProfileCard from "../components/UserProfileCard";
import { useGitoStore } from "@/store/useGitoStore";
import { GitoLoader } from "@/components/Loader";
import Image from "next/image";

const Home: React.FC = () => {
  const [isPageLoading, setIsPageLoading] = useState<boolean>(true);
  const { selectedUser, isLoading } = useGitoStore();

  useEffect(() => {
    const timer = setTimeout(() => setIsPageLoading(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="flex flex-col items-center justify-center w-full min-h-screen font-sans bg-gray-900 text-gray-100 p-6">
      <GitoLoader isLoading={isPageLoading} />

      <AnimatePresence mode="wait">
        {!isPageLoading &&
          (selectedUser ? (
            <UserProfileCard key="user-profile" />
          ) : (
            <motion.div
              key="search-ui"
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 12 }}
              transition={{ duration: 0.28 }}
              className="w-full max-w-3xl flex flex-col items-center mb-40"
            >
              <div className="w-full flex flex-col items-center">
                <Image src={"/gito.png"} alt="logo" width={192} height={192} />
                <h1 className="mb-2 text-4xl font-extrabold text-white">
                  Gito Search
                </h1>
                <p className="mb-6 text-lg text-gray-400">
                  Find developers across the globe
                </p>

                <div className="w-full max-w-2xl relative">
                  <SearchBar />
                  <SuggestionBar />
                </div>
              </div>
            </motion.div>
          ))}
      </AnimatePresence>
    </main>
  );
};

export default Home;
