import { create } from 'zustand';

interface SidebarStoreType {
  open: boolean;
  setOpen: () => void;
}

const useSidebarStore = create<SidebarStoreType>()((set) => ({
  open: false,
  setOpen() {
    set((s) => ({ open: !s.open }));
  },
}));

export default useSidebarStore;
