import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const EXPIRATION_TIME = 60 * 1000;

const useAssociationStore = create(
    persist(
        (set, get) => ({
            associations: [],
            expirationTime: null,
            getAssociations: async () => {
                const now = new Date().getTime();
                const { associations, expirationTime } = get();

                if (expirationTime && now < expirationTime) {
                    return associations;
                }

                try {
                    const response = await fetch(`${import.meta.env.VITE_API_URL}/admin/clubs`, {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                            'X-ADMIN-KEY': import.meta.env.VITE_ADMIN_KEY
                        }
                    });
                    if (!response.ok) {
                        throw new Error("Erreur lors de la récupération des associations");
                    }

                    const data = await response.json();
                    const newAssociations = data.response[0].data;
                    set({
                        associations: newAssociations,
                        expirationTime: now + EXPIRATION_TIME,
                    });
                    return newAssociations;
                } catch (error) {
                    console.error("Erreur lors de la récupération des associations :", error);
                    return [];
                }
            },
        }),
        {
            name: 'association-storage',
            getStorage: () => localStorage,
        }
    )
);

export default useAssociationStore;