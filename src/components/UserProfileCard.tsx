import { useGitoStore } from "@/store/useGitoStore";
import { AnimatePresence, motion } from "framer-motion";
import {
  X,
  Users,
  UserPlus,
  Building,
  Link as LinkIcon,
  LoaderCircle,
} from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

const UserProfileCard: React.FC = () => {
  const {
    selectedUser,
    isGeminiLoading,
    geminiSummary,
    geminiError,
    clearSelectedUser,
    getGeminiSummary,
  } = useGitoStore();
  const [isSummaryVisible, setIsSummaryVisible] = useState(false);

  useEffect(() => {
    if (selectedUser) {
      getGeminiSummary(selectedUser?.login, selectedUser?.bio as string);
    }
  }, [selectedUser, getGeminiSummary]);

  if (!selectedUser) return null;

  const {
    avatar_url,
    name,
    login,
    html_url,
    followers,
    following,
    company,
    blog,
    bio,
  } = selectedUser;

  const handleGeminiClick = () => {
    setIsSummaryVisible(true);
    if (isSummaryVisible) setIsSummaryVisible(false);
  };

  const userImageUrl = avatar_url ? avatar_url : "/user.png";

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -40, scale: 0.95 }}
      transition={{ type: "spring", stiffness: 200, damping: 25 }}
      className="w-full max-w-md mx-auto
                 bg-gradient-to-br from-indigo-900/70 via-purple-900/60 to-fuchsia-900/70
                 backdrop-blur-xl rounded-3xl
                 shadow-2xl shadow-indigo-500/20
                 p-6 md:p-8 relative
                 border border-indigo-400/20"
    >
      <button
        onClick={clearSelectedUser}
        className="absolute top-4 right-4 text-indigo-100/60 hover:text-white transition-colors duration-200"
        aria-label="Close profile"
      >
        <X size={24} />
      </button>

      <div className="flex flex-col items-center text-center">
        <Image
          src={userImageUrl}
          alt={login}
          width={128}
          height={128}
          className="rounded-full border-4 border-indigo-500/50
                     shadow-lg shadow-indigo-500/30
                     animate-pulse-slow"
        />
        <h1 className="mt-4 text-3xl font-bold text-white tracking-tight">
          {name || login}
        </h1>
        <h2 className="text-xl text-indigo-100/80">@{login}</h2>
        <p className="mt-4 text-indigo-100/70 max-w-xs">
          {bio || "This user has no bio."}
        </p>

        <div className="mt-6 flex flex-wrap justify-center gap-4 text-indigo-100/70">
          <div className="flex items-center gap-2">
            <Users size={18} />
            <span>
              <span className="font-bold text-white">{followers}</span>{" "}
              followers
            </span>
          </div>
          <div className="flex items-center gap-2">
            <UserPlus size={18} />
            <span>
              <span className="font-bold text-white">{following}</span>{" "}
              following
            </span>
          </div>
        </div>

        <div className="mt-4 w-full border-t border-indigo-400/20 my-6"></div>

        <div className="flex flex-col items-center gap-2 text-indigo-100/70">
          {company && (
            <div className="flex items-center gap-2">
              <Building size={16} />
              <span>{company}</span>
            </div>
          )}
          {blog && (
            <a
              href={blog.startsWith("http") ? blog : `https://${blog}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-indigo-400 hover:text-indigo-300 hover:underline transition-colors duration-200"
            >
              <LinkIcon size={16} />
              <span>{blog}</span>
            </a>
          )}
          <a
            href={html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full bg-indigo-600/80 backdrop-blur-sm
                       text-white font-bold py-2 px-4 rounded-xl
                       hover:bg-indigo-500/80 hover:shadow-lg hover:shadow-indigo-500/30
                       transition-all duration-300 text-center mt-2"
          >
            View Profile
          </a>
        </div>

        <div className="mt-8 w-full flex sm:flex-row gap-3">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            className="w-full p-0.5 bg-gradient-to-r from-indigo-500 to-fuchsia-500 rounded-xl shadow-md shadow-indigo-500/20"
          >
            <button
              onClick={handleGeminiClick}
              className="w-full bg-gradient-to-br from-indigo-950/80 to-purple-950/80
                         text-white font-bold py-3 px-6 rounded-xl
                         hover:bg-transparent transition-all duration-300"
            >
              Ask Gemini
            </button>
          </motion.div>
        </div>
      </div>

      <AnimatePresence>
        {isSummaryVisible && (
          <motion.div
            initial={{ opacity: 0, scaleY: 0, originY: 0 }}
            animate={{ opacity: 1, scaleY: 1 }}
            exit={{ opacity: 0, scaleY: 0 }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            className="mt-6 pt-6 border-t border-indigo-400/20 text-right overflow-hidden"
          >
            {isGeminiLoading && (
              <div className="flex justify-center items-center gap-2 text-indigo-100/60">
                <LoaderCircle className="w-5 h-5 animate-spin" />
                <span>Generating summary...</span>
              </div>
            )}
            {geminiError && (
              <p className="text-red-400 text-center">{geminiError}</p>
            )}
            {geminiSummary && (
              <div>
                <h3 className="text-lg font-bold text-white mb-2 tracking-tight">
                  Gemini Summary
                </h3>
                <p className="text-indigo-100/70 whitespace-pre-wrap text-right">
                  {geminiSummary}
                </p>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default UserProfileCard;
