import { useGitoStore } from "@/store/useGitoStore";
import { GitHubUser } from "@/types";
import Image from "next/image";

export const SuggestionItem: React.FC<{ user: GitHubUser }> = ({ user }) => {
  const selectUser = useGitoStore((state) => state.selectUser);
  return (
    <button
      onClick={() => selectUser(user.login)}
      className="flex items-center p-2 space-x-3 hover:bg-gray-700/50 rounded-md transition-colors w-full text-left"
    >
      <Image
        src={user.avatar_url}
        alt={user.login}
        width={32}
        height={32}
        className="rounded-full"
      />
      <span className="text-white font-medium">{user.login}</span>
    </button>
  );
};
