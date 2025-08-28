import { useInView } from "react-intersection-observer";
import { motion, AnimatePresence } from "framer-motion";
import { LoaderCircle, ServerCrash } from "lucide-react";
import { useGitoStore } from "@/store/useGitoStore";
import { useEffect } from "react";
import { SuggestionItem } from "./SuggestionItem";

const SuggestionBar: React.FC = () => {
  const {
    users,
    isLoading,
    isLoadingMore,
    error,
    totalCount,
    loadMoreUsers,
    query,
  } = useGitoStore();
  const { ref, inView } = useInView({ threshold: 1 });

  useEffect(() => {
    if (inView && users.length < totalCount && !isLoadingMore) {
      loadMoreUsers();
    }
  }, [inView, users.length, totalCount, isLoadingMore, loadMoreUsers]);

  if (!query || isLoading) return null;

  if (error) {
    return (
      <div className="mt-2 w-full max-w-2xl px-4 text-center text-red-400">
        <ServerCrash className="w-6 h-6 mx-auto mb-2" />
        <p>{error}</p>
      </div>
    );
  }

  if (users.length === 0 && !isLoading) {
    return (
      <div className="mt-2 w-full max-w-2xl px-4 text-center text-gray-400">
        <p>No users found for &quot;{query}&quot;.</p>
      </div>
    );
  }

  return (
    <AnimatePresence>
      {users?.length > 0 && (
        <motion.div
          key="suggestions"
          initial={{ opacity: 0, y: -8, scale: 0.995 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -8, scale: 0.995 }}
          transition={{ duration: 0.16, ease: "easeOut" }}
          className="absolute left-0 right-0 top-full mt-2 z-40"
          style={{ transformOrigin: "top center" }}
        >
          <div className="pointer-events-none px-2">
            <ul
              role="listbox"
              aria-label="Search suggestions"
              className="pointer-events-auto w-full bg-gray-800/10 backdrop-blur-sm border border-gray-700 rounded-lg max-h-60 overflow-y-auto shadow-xl divide-y divide-white/4"
            >
              {users.map((user) => (
                <li key={user.id}>
                  <SuggestionItem user={user} />
                </li>
              ))}

              {users.length < totalCount && (
                <li
                  ref={ref}
                  className="flex justify-center items-center h-10"
                  aria-hidden={!isLoadingMore}
                >
                  {isLoadingMore && (
                    <div className="w-8 h-8 flex items-center justify-center">
                      <LoaderCircle className="w-5 h-5 text-teal-400 animate-spin" />
                    </div>
                  )}
                </li>
              )}
            </ul>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SuggestionBar;
