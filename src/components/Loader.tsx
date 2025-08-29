import { useGitoStore } from "@/store/useGitoStore";
import { motion, AnimatePresence } from "framer-motion";

export const GitoLoader: React.FC = () => {
  const { isWelcomeFinished, setIsWelcomeFinished } = useGitoStore();
  return (
    <>
      {!isWelcomeFinished && (
        <>
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.8 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="fixed inset-0 z-50 bg-gradient-to-b from-blue-400/60 to-blue-700/60 backdrop-blur-md"
            aria-hidden
          />

          <motion.div
            key="loader"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="fixed inset-0 z-50 flex flex-col items-center justify-center pointer-events-none relative"
            aria-live="polite"
          >
            <div className="absolute top-1/4 left-1/4 w-6 h-6 bg-white/30 rounded-full animate-float" />
            <div className="absolute top-1/3 right-1/3 w-6 h-6 bg-white/30 rotate-45 animate-float-delayed" />
            <div className="absolute top-1/2 left-1/3 w-6 h-6 flex items-center justify-center animate-float">
              <div className="w-6 h-1 bg-white/30 absolute"></div>
              <div className="w-1 h-6 bg-white/30 absolute"></div>
            </div>
            <div className="absolute bottom-1/4 right-1/4 w-4 h-4 bg-white/30 rounded animate-float-delayed" />

            <div className="flex flex-col items-center text-center">
              <div className="text-6xl font-extrabold text-white tracking-tight mb-2">
                Welcome to Gito
              </div>
              <div className="text-xl text-white/80">
                Discovering amazing developers just for you…
              </div>
            </div>

            <svg
              className="absolute bottom-0 w-full h-32"
              viewBox="0 0 1440 320"
              preserveAspectRatio="none"
            >
              <path
                fill="rgba(255,255,255,0.1)"
                fillOpacity="1"
                d="M0,192L48,181.3C96,171,192,149,288,165.3C384,181,480,235,576,234.7C672,235,768,181,864,181.3C960,181,1056,235,1152,240C1248,245,1344,203,1392,181.3L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
              ></path>
            </svg>

            <div
              onClick={setIsWelcomeFinished}
              className="absolute -bottom-28 left-1/2 -translate-x-1/2 w-16 h-16 flex items-center justify-center bg-white rounded-full shadow-2xl shadow-blue-500/40 pointer-events-auto"
            >
              <svg
                className="w-8 h-8 text-blue-600 animate-pulse"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M4 12H20M20 12L14 6M20 12L14 18" />
              </svg>
            </div>
          </motion.div>
        </>
      )}
    </>
  );
};
