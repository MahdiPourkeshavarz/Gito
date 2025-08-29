"use client";
import { motion, AnimatePresence } from "framer-motion";
import SearchBar from "../components/SearchBar";
import SuggestionBar from "../components/SuggestionBar";
import UserProfileCard from "../components/UserProfileCard";
import { useGitoStore } from "@/store/useGitoStore";
import { GitoLoader } from "@/components/Loader";
import Image from "next/image";

const Home: React.FC = () => {
  const { selectedUser, isWelcomeFinished } = useGitoStore();

  return (
    <main className="flex flex-col items-center justify-center w-full min-h-screen font-sans bg-gradient-to-b from-blue-400/60 to-blue-700/60 text-gray-100 p-6">
      <AnimatePresence mode="wait">
        {!isWelcomeFinished ? (
          <GitoLoader key="loader" />
        ) : selectedUser ? (
          <UserProfileCard key="user-profile" />
        ) : (
          <motion.div
            key="search-ui"
            initial={{ opacity: 0, y: 100, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -100, scale: 0.95 }}
            transition={{ duration: 0.8, ease: "easeInOut", delay: 0.1 }}
            className="w-full max-w-3xl flex flex-col items-center mb-40"
          >
            <div className="w-full flex flex-col items-center">
              <Image
                src={"/gito.png"}
                alt="logo"
                width={192}
                height={192}
                className="rounded-full shadow-lg shadow-indigo-500/20 mb-4"
              />
              <h1 className="mb-2 text-4xl font-extrabold text-white tracking-tight">
                Gito Search
              </h1>
              <p className="mb-6 text-lg text-indigo-100/80">
                Find developers across the globe
              </p>

              <div className="w-full max-w-2xl relative rounded-2xl p-4">
                <SearchBar />
                <SuggestionBar />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
};

export default Home;
