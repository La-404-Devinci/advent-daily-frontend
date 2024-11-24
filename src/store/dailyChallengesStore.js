import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const EXPIRATION_TIME = 5 *60 * 1000;
const ADMIN_EXPIRATION_TIME = 30 * 1000;

const useDailyChallengesStore = create(
    persist(
        (set, get) => ({
            dailyChallenges: [],
            expirationTime: null,
            getDailyChallenges: async () => {
                const now = new Date().getTime();
                const { dailyChallenges, expirationTime } = get();

                if (expirationTime && now < expirationTime) {
                    return dailyChallenges;
                }

                try {
                    const response = await fetch(`${import.meta.env.VITE_API_URL}/daily/challenges`);
                    if (!response.ok) {
                        throw new Error("Erreur lors de la récupération des défis");
                    }

                    const data = await response.json();
                    const newDailyChallenges = data.response[0].data;
                    set({
                        dailyChallenges: newDailyChallenges,
                        expirationTime: now + (import.meta.env.VITE_ADMIN_KEY ? ADMIN_EXPIRATION_TIME : EXPIRATION_TIME),
                    });
                    return newDailyChallenges;
                } catch (error) {
                    console.error("Erreur lors de la récupération des défis :", error);
                    return [];
                }
            },
        }),
        {
            name: 'daily-challenges-storage',
            getStorage: () => localStorage,
        }
    )
);

export default useDailyChallengesStore;