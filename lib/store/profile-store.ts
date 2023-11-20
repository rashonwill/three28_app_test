import { create } from 'zustand';

interface ProfileStoreType {
  currentMobileTab: string;
  setCurrentMobileTab: (currentMobileTab: string) => void;
}

const useProfileStore = create<ProfileStoreType>()((set) => ({
  currentMobileTab: 'Home',
  setCurrentMobileTab(currentMobileTab) {
    set(() => ({ currentMobileTab }));
  },
}));

export default useProfileStore;
