import React, { FormEvent, useEffect } from "react";
import { Search } from "lucide-react";
import { useGitoStore } from "@/store/useGitoStore";
import { useDebounce } from "use-debounce";
import { motion } from "framer-motion";

const SearchBar: React.FC = () => {
  const { query, setQuery, searchUsers, isLoading } = useGitoStore();
  const [debouncedQuery] = useDebounce(query, 500);

  useEffect(() => {
    if (debouncedQuery) searchUsers();
  }, [debouncedQuery, searchUsers]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    searchUsers();
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="relative">
        <input
          id="github-search"
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search GitHub users"
          className="w-full pl-12 pr-14 py-3 text-sm text-white bg-white/6 backdrop-blur-sm border border-white/6 rounded-2xl shadow-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-teal-400 transition"
          aria-label="Search GitHub users"
        />

        <div className="absolute inset-y-0 right-2 flex items-center">
          <button
            type="submit"
            aria-label="Search"
            className="inline-flex items-center justify-center rounded-full p-2 bg-white/4 hover:bg-white/6 active:scale-95 transition"
            disabled={isLoading}
          >
            <Search className="w-5 h-5 text-slate-300" />
          </button>
        </div>

        <div className="absolute left-0 right-0 top-full mt-2 pointer-events-none z-20">
          <motion.div
            initial={{ width: 0, opacity: 0 }}
            animate={
              isLoading
                ? { width: "100%", opacity: 1 }
                : { width: 0, opacity: 0 }
            }
            transition={{ duration: 0.45, ease: "easeInOut" }}
            className="h-1 rounded-full bg-gradient-to-r from-teal-400 to-sky-400 shadow-sm"
            style={{ transformOrigin: "left" }}
          />
        </div>
      </div>
    </form>
  );
};

export default SearchBar;
