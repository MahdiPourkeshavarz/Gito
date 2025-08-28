import { useGitoStore } from "@/store/useGitoStore";
import { motion } from "framer-motion";
import { X, Users, UserPlus, Building, Link as LinkIcon } from "lucide-react";
import Image from "next/image";

const UserProfileCard: React.FC = () => {
  const { selectedUser, clearSelectedUser } = useGitoStore();

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

  return (
    <motion.div
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
        </div>

        <a
          href={html_url}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-8 w-full bg-teal-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-teal-700 transition-all duration-300"
        >
          View GitHub Profile
        </a>
      </div>
    </motion.div>
  );
};

export default UserProfileCard;
