"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SearchBar from "../components/SearchBar";
import SuggestionBar from "../components/SuggestionBar";
import UserProfileCard from "../components/UserProfileCard";
import { LoaderCircle } from "lucide-react";
import { useGitoStore } from "@/store/useGitoStore";
import { GitoLoader } from "@/components/Loader";

const Home: React.FC = () => {
  const [isPageLoading, setIsPageLoading] = useState<boolean>(true);
  const { selectedUser, isLoading } = useGitoStore();

  useEffect(() => {
    const timer = setTimeout(() => setIsPageLoading(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="flex flex-col items-center justify-center w-full min-h-screen font-sans bg-gray-900 text-gray-100 p-4">
      <GitoLoader isLoading={isPageLoading} />

      <AnimatePresence mode="wait">
        {!isPageLoading &&
          (selectedUser ? (
            <UserProfileCard key="user-profile" />
          ) : (
            <motion.div
              key="search-ui"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.3 }}
              className="w-full flex flex-col items-center"
            >
              <div className="w-full flex flex-col items-center">
                <h1 className="mb-2 text-4xl font-bold text-white">
                  Gito Search
                </h1>
                <p className="mb-6 text-lg text-gray-400">
                  Find developers across the globe
                </p>
                <div className="w-full max-w-2xl relative">
                  <SearchBar />
                  <SuggestionBar />
                </div>
                {isLoading && (
                  <div className="mt-8">
                    <LoaderCircle className="w-8 h-8 text-teal-500 animate-spin" />
                  </div>
                )}
              </div>
            </motion.div>
          ))}
      </AnimatePresence>
    </main>
  );
};

export default Home;
