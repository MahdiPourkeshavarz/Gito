/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";
import { GithubResponse, UserState } from "@/types";
import apiClient from "@/libs/axiosClient";

const USERS_PER_PAGE = 5;

export const useGitoStore = create<UserState>((set, get) => ({
  query: "",
  users: [],
  totalCount: 0,
  page: 1,
  isLoading: false,
  isLoadingMore: false,
  error: null,
  selectedUser: null,
  setQuery: (query) => set({ query }),
  searchUsers: async () => {
    const { query } = get();
    if (!query.trim()) {
      set({ users: [], totalCount: 0, error: null });
      return;
    }
    set({ isLoading: true, error: null, users: [], page: 1, totalCount: 0 });
    try {
      const response = await apiClient.get(
        `search/users?q=${query}&per_page=${USERS_PER_PAGE}`
      );
      const data: GithubResponse = response.data;
      set({
        users: data.items,
        totalCount: data.total_count,
        isLoading: false,
      });
    } catch (err: any) {
      const errorMessage =
        err.response?.data?.message || "An unexpected error occurred.";
      set({ error: errorMessage, isLoading: false, users: [] });
    }
  },
  loadMoreUsers: async () => {
    const { query, page, users, totalCount } = get();
    if (users.length >= totalCount || get().isLoadingMore) return;

    const nextPage = page + 1;
    set({ isLoadingMore: true });
    try {
      const response = await apiClient.get(
        `/search/users?q=${query}&per_page=${USERS_PER_PAGE}&page=${nextPage}`
      );
      const data: GithubResponse = response.data;
      set((state) => ({
        users: [...state.users, ...data.items],
        page: nextPage,
        isLoadingMore: false,
      }));
    } catch (err: any) {
      const errorMessage =
        err.response?.data?.message || "Failed to load more users.";
      set({ error: errorMessage, isLoadingMore: false });
    }
  },

  selectUser: async (username: string) => {
    set({ isLoading: true, error: null, users: [], query: "" });
    try {
      const response = await apiClient.get(`users/${username}`);
      set({ selectedUser: response.data, isLoading: false });
    } catch (err: any) {
      const errorMessage =
        err.response?.data?.message || "Could not fetch user profile.";
      set({ error: errorMessage, isLoading: false });
    }
  },

  clearSelectedUser: () => {
    set({ selectedUser: null, error: null });
  },
}));
