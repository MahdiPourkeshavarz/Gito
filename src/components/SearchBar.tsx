import React, { FormEvent, useEffect } from "react";
import { LoaderCircle, Search } from "lucide-react";
import { useGitoStore } from "@/store/useGitoStore";
import { useDebounce } from "use-debounce";

const SearchBar: React.FC = () => {
  const { query, setQuery, searchUsers, isLoading } = useGitoStore();

  const [debouncedQuery] = useDebounce(query, 500);

  useEffect(() => {
    if (debouncedQuery) {
      searchUsers();
    }
  }, [debouncedQuery, searchUsers]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    searchUsers();
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl px-4">
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for GitHub users..."
          className="w-full px-4 py-3 pr-12 text-white bg-gray-800 border-2 border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors"
        />
        <div className="absolute inset-y-0 right-0 flex items-center justify-center w-12">
          {isLoading ? (
            <LoaderCircle className="w-5 h-5 text-gray-400 animate-spin" />
          ) : (
            <button
              type="submit"
              aria-label="Search"
              className="w-full h-full flex items-center justify-center text-gray-400 hover:text-teal-400 transition-colors"
            >
              <Search className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>
    </form>
  );
};

export default SearchBar;
