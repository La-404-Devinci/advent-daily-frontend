import { create } from 'zustand';

const useUsersStore = create(
    (set, get) => ({
        users: [],
        getUsers: async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_API_URL}/admin/users`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'X-ADMIN-KEY': import.meta.env.VITE_ADMIN_KEY
                    }
                });
                if (!response.ok) {
                    throw new Error("Erreur lors de la récupération des utilisateurs");
                }

                const data = await response.json();
                const newUsers = data.response[0].data;
                set({
                    users: newUsers,
                });
                return newUsers;
            } catch (error) {
                console.error("Erreur lors de la récupération des utilisateurs :", error);
                return [];
            }
        },
    }),
);

export default useUsersStore;