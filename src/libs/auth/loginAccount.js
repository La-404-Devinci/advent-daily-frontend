export async function loginAccount(email, password, navigate) {
    try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: email,
                password: password,
            }),
        });

        if (!response.ok) {
            throw new Error("Erreur lors de la connexion");
        }

        const result = await response.json();

        if (result) {
            const responseData = result.response?.[0]?.data;
            localStorage.setItem("authToken", responseData);
            navigate("/calendar");
        }
    } catch (error) {
        console.error(error);
    }
};
