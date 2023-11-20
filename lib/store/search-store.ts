import { create } from 'zustand';

interface SearchType {
  isSearching: boolean;
  setSearching: (isSearching: boolean) => void;
}

const useSearch = create<SearchType>()((set) => ({
  isSearching: false,
  setSearching(isSearching) {
    set(() => ({ isSearching }));
  },
}));

export default useSearch;

useSearch.subscribe((s) => console.log(s.isSearching));
