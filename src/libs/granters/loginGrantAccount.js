
export async function loginGrantAccount(email, password, navigate) {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/granters/login`, {
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
        throw new Error("Email ou mot de passe incorrect");
    }

    const result = await response.json();

    if (result) {
        const responseData = result.response?.[0]?.data;
        localStorage.setItem("grantersToken", JSON.stringify(responseData));
        navigate("/admin/scan");
    }
};
