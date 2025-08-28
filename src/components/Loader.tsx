import { motion, AnimatePresence } from "framer-motion";

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
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.28 }}
            className="fixed inset-0 z-50 bg-gradient-to-br from-indigo-900/50 to-purple-900/50 backdrop-blur-md"
            aria-hidden
          />

          <motion.div
            key="loader"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.28, ease: "easeInOut" }}
            className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none"
            aria-live="polite"
          >
            <div className="pointer-events-auto bg-gradient-to-r from-white/8 to-white/12 backdrop-blur-xl border border-white/10 rounded-2xl px-4 py-3 flex items-center gap-3 shadow-2xl shadow-indigo-500/20 max-w-xs">
              <div className="w-8 h-8 flex items-center justify-center relative">
                <svg
                  className="w-6 h-6 animate-spin text-indigo-300"
                  viewBox="0 0 24 24"
                  fill="none"
                  aria-hidden
                >
                  <circle
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="rgba(255,255,255,0.1)"
                    strokeWidth="3"
                  ></circle>
                  <path
                    d="M22 12a10 10 0 00-10-10"
                    stroke="url(#gradient)"
                    strokeWidth="3"
                    strokeLinecap="round"
                  ></path>
                  <defs>
                    <linearGradient
                      id="gradient"
                      x1="12"
                      y1="2"
                      x2="22"
                      y2="12"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stopColor="#A78BFA" />
                      <stop offset="1" stopColor="#6366F1" />
                    </linearGradient>
                  </defs>
                </svg>
                <div className="absolute inset-0 animate-pulse rounded-full bg-indigo-500/10 blur-sm" />
              </div>

              <div className="flex flex-col">
                <div className="text-lg font-bold text-white tracking-tight">
                  Welcome to Gito
                </div>
                <div className="text-sm text-indigo-100/80 mt-0.5">
                  Discovering amazing developers just for you…
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
