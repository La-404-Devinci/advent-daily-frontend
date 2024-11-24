import { create } from 'zustand';

const usePasswordStore = create((set) => ({
    password: "",
    setPassword: (password) => set({ password }),
}));

export default usePasswordStore;
