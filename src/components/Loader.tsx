import { motion, AnimatePresence, Variants } from "framer-motion";

interface GitoLoaderProps {
  isLoading: boolean;
}

export const GitoLoader: React.FC<GitoLoaderProps> = ({ isLoading }) => {
  return (
    <AnimatePresence>
      {isLoading && (
        <>
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.45 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.28 }}
            className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm"
            aria-hidden
          />

          <motion.div
            key="loader"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.28 }}
            className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none"
            aria-live="polite"
          >
            <div className="pointer-events-auto bg-white/6 backdrop-blur-md border border-white/8 rounded-2xl px-6 py-4 flex items-center gap-4 shadow-lg">
              <div className="w-9 h-9 flex items-center justify-center">
                <svg
                  className="w-6 h-6 animate-spin"
                  viewBox="0 0 24 24"
                  fill="none"
                  aria-hidden
                >
                  <circle
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="rgba(255,255,255,0.18)"
                    strokeWidth="3"
                  ></circle>
                  <path
                    d="M22 12a10 10 0 00-10-10"
                    stroke="white"
                    strokeWidth="3"
                    strokeLinecap="round"
                  ></path>
                </svg>
              </div>

              <div className="flex flex-col">
                <div className="text-lg font-semibold text-white">Gito</div>
                <div className="text-sm text-gray-300">
                  Searching for developers…
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default GitoLoader;
