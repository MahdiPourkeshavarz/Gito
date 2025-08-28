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

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ type: "spring", duration: 0.5 }}
      className="w-full max-w-md mx-auto bg-gray-800 rounded-2xl shadow-lg p-6 md:p-8 relative border border-gray-700"
    >
      <button
        onClick={clearSelectedUser}
        className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
        aria-label="Close profile"
      >
        <X size={24} />
      </button>

      <div className="flex flex-col items-center text-center">
        <Image
          src={avatar_url}
          alt={login}
          width={128}
          height={128}
          className="rounded-full border-4 border-teal-500"
        />
        <h1 className="mt-4 text-3xl font-bold text-white">{name || login}</h1>
        <h2 className="text-xl text-gray-400">@{login}</h2>
        <p className="mt-4 text-gray-300 max-w-xs">
          {bio || "This user has no bio."}
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-4 text-gray-300">
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
        <div className="mt-4 w-full border-t border-gray-700 my-6"></div>
        <div className="flex flex-col items-center gap-2 text-gray-300">
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
              className="flex items-center gap-2 text-teal-400 hover:underline"
            >
              <LinkIcon size={16} />
              <span>{blog}</span>
            </a>
          )}
          <a
            href={html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full bg-teal-600 text-white font-bold py-1 px-3 rounded-lg hover:bg-teal-700 transition-all duration-300 text-center mt-1"
          >
            View Profile
          </a>
        </div>

        <div className="mt-8 w-full flex sm:flex-row gap-3">
          <div className="w-full p-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg">
            <button
              onClick={handleGeminiClick}
              className="w-full bg-gray-800 text-gray-200 font-bold py-3 px-6 rounded-md hover:bg-transparent hover:text-white transition-all duration-300"
            >
              Ask Gemini
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isSummaryVisible && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-6 pt-6 border-t border-gray-700 text-left overflow-hidden"
          >
            {isGeminiLoading && (
              <div className="flex justify-center items-center gap-2 text-gray-400">
                <LoaderCircle className="w-5 h-5 animate-spin" />
                <span>Generating summary...</span>
              </div>
            )}
            {geminiError && (
              <p className="text-red-400 text-center">{geminiError}</p>
            )}
            {geminiSummary && (
              <div>
                <h3 className="text-lg font-bold text-white mb-2">
                  Gemini Summary
                </h3>
                <p className="text-gray-300 whitespace-pre-wrap">
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
