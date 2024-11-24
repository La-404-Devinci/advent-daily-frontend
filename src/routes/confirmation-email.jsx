import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { MailOpen } from "lucide-react";
import Layout from "../layout";


export default function ConfirmationEmail() {
    const location = useLocation();
    const navigate = useNavigate();
    const { email } = location.state || {};
    const [emailSent, setEmailSent] = useState(false);

    const token = localStorage.getItem("token");

    useEffect(() => {
        const sendEmail = async () => {
            if (!email || emailSent) return;

            try {
                const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/send-mail`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ email }),
                });

                if (!response.ok) {
                    const errorText = await response.text();
                    console.error("Erreur :", errorText);
                    throw new Error("Erreur lors de l'envoi de l'email");
                }

                setEmailSent(true);
            } catch (error) {
                console.error("Erreur :", error.message);
            }
        };

        if (!emailSent) {
            sendEmail();
        }
    }, [email, emailSent]);

    return (
        <Layout>
            <div className="flex flex-col min-h-screen px-6 py-32 text-center w-full">
                <div>
                    <h1 className="text-5xl font-bold">Un mail t'as été envoyé</h1>
                    <p className="mt-4 text-2xl text-white-300">Regarde tes spams</p>
                </div>
                <form className="flex flex-col justify-center items-center w-full gap-8 py-20">
                    <MailOpen className="h-24 w-24 "/>
                    <div className=" flex flex-col items-start w-full">
                        <input type="text" placeholder={email} value={email} disabled
                               className=" w-full py-2 pl-3 pr-8 mt-2 bg-white border border-gray-300 rounded-md focus:border-blue-900 text-gray-950"/>
                    </div>
                </form>
                <p className="flex flex-col text-center">
                    J'ai pas un 404ID{" "}
                    <span>
                        <a href="/login" className="font-medium text-blue-400 underline">
                            Me connecter
                        </a>
                    </span>
                </p>
            </div>
        </Layout>
    );
}