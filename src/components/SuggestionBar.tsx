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
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        className="mt-2 w-full max-w-2xl px-2"
      >
        <div className="w-full p-2 bg-gray-800/80 backdrop-blur-sm border border-gray-700 rounded-lg max-h-60 overflow-y-auto">
          {users.map((user) => (
            <SuggestionItem key={user.id} user={user} />
          ))}

          {users.length < totalCount && (
            <div ref={ref} className="flex justify-center items-center h-10">
              {isLoadingMore && (
                <LoaderCircle className="w-5 h-5 text-teal-500 animate-spin" />
              )}
            </div>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default SuggestionBar;
