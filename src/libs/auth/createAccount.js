
export async function createAccount(username, email, password, token, selectedAssociation, navigate) {

    try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/users`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                token: token,
                email: email,
                password: password,
                clubId: selectedAssociation ? String(selectedAssociation.id) : null,
                username: username,
            }),
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error("Erreur :", errorText);
            throw new Error("Erreur lors de la création de l'utilisateur");
        }

        const result = await response.json();
        const data = result.response?.[0]?.data;

        if (data) {
            localStorage.setItem("user", JSON.stringify({
                id: data.uuid,
                username: data.username,
                email: data.email,
                clubId: data?.clubId,
                avatarUrl: "",
                quote: "",
            }));
            localStorage.removeItem("token");
            navigate && navigate("/login");
        }
    } catch (error) {
        console.error(error);
    }
}
