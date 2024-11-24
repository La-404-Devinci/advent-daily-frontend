import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const EXPIRATION_TIME = 10 * 60 * 1000;
const ADMIN_EXPIRATION_TIME = 30 * 1000;

const useDailyClubsStore = create(
    persist(
        (set, get) => ({
            dailyClubs: [],
            expirationTime: null,
            getDailyClubs: async () => {
                const now = new Date().getTime();
                const { dailyClubs, expirationTime } = get();

                if (expirationTime && now < expirationTime) {
                    return dailyClubs;
                }

                try {
                    const response = await fetch(`${import.meta.env.VITE_API_URL}/daily/clubs`);
                    if (!response.ok) {
                        throw new Error("Erreur lors de la récupération des associations");
                    }

                    const data = await response.json();
                    const newDailyClubs = data.response[0].data;
                    set({
                        dailyClubs: newDailyClubs,
                        expirationTime: now + (import.meta.env.VITE_ADMIN_KEY ? ADMIN_EXPIRATION_TIME : EXPIRATION_TIME),
                    });
                    return newDailyClubs;
                } catch (error) {
                    console.error("Erreur lors de la récupération des associations :", error);
                    return [];
                }
            },
        }),
        {
            name: "dailyClubsStore",
        }
    )
);

export default useDailyClubsStore
