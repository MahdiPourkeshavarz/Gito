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

export interface UserState {
  query: string;
  users: GitHubUser[];
  totalCount: number;
  page: number;
  isLoading: boolean;
  isLoadingMore: boolean;
  error: string | null;
  setQuery: (query: string) => void;
  searchUsers: () => Promise<void>;
  loadMoreUsers: () => Promise<void>;
}

export interface GithubResponse {
  total_count: number;
  incomplete_results: false;
  items: GitHubUser[];
}
