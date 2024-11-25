import { create } from "zustand";
import { persist } from "zustand/middleware";

const useMeStore = create(
    persist(
        (set) => ({
            me: null,
            getMe: async () => {
                const token = localStorage.getItem("authToken");
                if (!token) return;

                const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/me`, {
                    headers: {
                        "Authorization": `Bearer ${token}`,
                    },
                });

                if (!response.ok) {
                    return;
                }

                const data = await response.json();
                const uuid = data.response[0].data;
                set({ me: uuid });
            },
        }),
        {
            name: 'me-storage',
        }
    )
);

export default useMeStore;
