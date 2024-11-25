import { toast } from "sonner";

const sendEmail = async (email, emailSent) => {
    if (!email || emailSent) return;

    try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/send-mail`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email }),
        });
        
        const data = await response.json();

        if (!response.ok) {
            if (data.response[0].error === "errors.auth.conflict.email") {
                throw new Error("Cette email est déjà utilisé.");
            }
            throw new Error("Erreur lors de l'envoi de l'email.");
        }

        return true;

    } catch (error) {
        toast.error(error.message, {
            className: "border-red-800 bg-gray-900",
            classNames: {
                icon: "text-red-800",
            },
        });
    }
};

export default sendEmail;