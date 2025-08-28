export interface GitHubUser {
  id: number;
  login: string;
  node_id: string;
  avatar_url: string;
  gravatar_id: string;
  url: string;
  html_url: string;
  followers_url: string;
  following_url: string;
  gists_url: string;
  starred_url: string;
  subscriptions_url: string;
  organizations_url: string;
  repos_url: string;
  events_url: string;
  received_events_url: string;
  type: string;
  site_admin: boolean;
  score: number;
}

export interface GitHubUserProfile {
  login: string;
  id: number;
  node_id: string;
  avatar_url: string;
  gravatar_id: string;
  url: string;
  html_url: string;
  followers_url: string;
  following_url: string;
  gists_url: string;
  starred_url: string;
  subscriptions_url: string;
  organizations_url: string;
  repos_url: string;
  events_url: string;
  received_events_url: string;
  type: string;
  site_admin: boolean;
  name: string | null;
  company: string | null;
  blog: string | null;
  location: string | null;
  email: string | null;
  hireable: boolean | null;
  bio: string | null;
  twitter_username: string | null;
  public_repos: number;
  public_gists: number;
  followers: number;
  following: number;
  created_at: string;
  updated_at: string;
}

export interface UserState {
  query: string;
  users: GitHubUser[];
  totalCount: number;
  page: number;
  isLoading: boolean;
  isLoadingMore: boolean;
  error: string | null;
  selectedUser: GitHubUserProfile | null;
  geminiSummary: string | null;
  isGeminiLoading: boolean;
  geminiError: string | null;
  setQuery: (query: string) => void;
  searchUsers: () => Promise<void>;
  loadMoreUsers: () => Promise<void>;
  selectUser: (username: string) => void;
  clearSelectedUser: () => void;
  getGeminiSummary: (username: string, bio: string) => void;
}

export interface GithubResponse {
  total_count: number;
  incomplete_results: false;
  items: GitHubUser[];
}

export interface RepoSummary {
  name: string;
  description: string | null;
  language: string | null;
  topics: string[];
  stargazers_count: number;
  forks_count: number;
  pushed_at: string;
  fork: boolean;
  bio: string;
}
