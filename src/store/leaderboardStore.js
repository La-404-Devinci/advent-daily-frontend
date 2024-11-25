import { create } from "zustand";
import { persist } from "zustand/middleware";

const useLeaderboardStore = create(
    persist(
        (set, get) => ({
            etag: null,
            userLeaderboard: [],
            clubsLeaderboard: [],
            fetchLeaderboards: async () => {
                const etagRes = await fetch(`${import.meta.env.VITE_API_URL}/leaderboard/etag`);
                if (!etagRes.ok) throw new Error("Error fetching etag");
                const etagData = await etagRes.json();
                const etag = etagData.response[0].data;

                if (etag && etag === get().etag) return;

                const userRes = await fetch(`${import.meta.env.VITE_API_URL}/leaderboard?type=users`);
                const clubRes = await fetch(`${import.meta.env.VITE_API_URL}/leaderboard?type=clubs`);
                if (!userRes.ok || !clubRes.ok) throw new Error("Error fetching leaderboard");

                const userData = await userRes.json();
                const clubData = await clubRes.json();

                set({ userLeaderboard: userData.response[0].data, clubsLeaderboard: clubData.response[0].data, etag });
            },
            invalidate: () => {
                set({ etag: null });
                get().getUserLeaderboard();
                get().getClubsLeaderboard();
            },
        }),
    )
)

export default useLeaderboardStore
