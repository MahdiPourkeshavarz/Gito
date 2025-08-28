import React, { FormEvent } from "react";
import { Search } from "lucide-react";
import { useGitoStore } from "@/store/useGitoStore";

const SearchBar: React.FC = () => {
  const { query, setQuery, searchUsers } = useGitoStore();

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
        <button
          type="submit"
          className="absolute inset-y-0 right-0 flex items-center justify-center w-12 text-gray-400 hover:text-teal-400 transition-colors"
        >
          <Search className="w-5 h-5" />
        </button>
      </div>
    </form>
  );
};

export default SearchBar;
