import { create } from "zustand";
import { persist } from "zustand/middleware";


const EXPIRATION_TIME = 5 *60 * 1000;

const useProfileStore = create(
    persist(
        (set, get) => ({
            profiles: {},
            getProfile: async (uuid) => {
                const now = new Date().getTime();
                const { profiles } = get();

                if (profiles[uuid] && profiles[uuid].expirationTime && now < profiles[uuid].expirationTime) {
                    return profiles[uuid];
                }

                try {
                    const response = await fetch(`${import.meta.env.VITE_API_URL}/users/${uuid}`);
                    if (!response.ok) {
                        throw new Error("Erreur lors de la récupération du profil");
                    }
                    const data = await response.json();
                    set({
                        profiles: { ...profiles, [uuid]: { ...data.response[0].data, expirationTime: now + EXPIRATION_TIME } },
                    });
                    return data;
                } catch (error) {
                    console.error("Erreur lors de la récupération du profil :", error);
                }
            },
            revalidateProfile: async (uuid) => {
                set((state) => {
                    state.profiles[uuid].expirationTime = 0;
                    return state;
                });
                await get().getProfile(uuid);
            }
        }),
        {
            name: "profile-storage",
        }
    )
)

export default useProfileStore;
