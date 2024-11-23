import {zodResolver} from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form";
import {useNavigate} from "react-router-dom";
import {z} from "zod";
import {Button} from "../components/buttons/Buttons";
import Layout from "../layout";

export default function Login() {
    const navigate = useNavigate();

    const passwordValidation = new RegExp(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/
    );

    const schema = z.object({
        email: z.string()
            .email({message: "Email invalide"})
            .regex(/(edu\.devinci\.fr|devinci\.fr)$/,
                {message: "L'email de ton compte doit être de type 'edu.devinci.fr' ou 'devinci.fr'"}),
        password: z.string()
            .min(1, {message: "Mot de passe requis"})
            .regex(passwordValidation, {
                message: "Mot de passe invalide"
            }),
    });

    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm({
        resolver: zodResolver(schema),
        defaultValues: {
            email: localStorage.getItem("email") ?? "",
        },
    });

    const onSubmit = async (data) => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: data.email,
                    password: data.password,
                }),
            });

            if (!response.ok) {
                const errorText = await response.text();
                console.error("Erreur :", errorText);
                throw new Error("Erreur lors de la connexion");
            }

            const result = await response.json();
            const responseData = result.response?.[0]?.data;

            if (responseData) {
                const user = JSON.parse(localStorage.getItem("user"));
                user.authToken = responseData;
                localStorage.setItem("user", JSON.stringify(user));
                navigate("/calendar");
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <Layout>
            <div className="flex flex-col justify-between min-h-screen px-6 py-32 text-center w-full">
                <div>
                    <h1 className="text-5xl font-bold">Bon retour !</h1>
                    <p className="mt-4 text-sm text-gray-300">Reviens prendre ta place au sommet de la compétition.</p>
                </div>

                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="flex flex-col justify-start w-full gap-4"
                >
                    <div className="flex flex-col items-start max-w-full gap-4">
                        <div className="flex flex-col items-start w-full">
                            <label htmlFor="email">Email *</label>
                            <input
                                id="email"
                                type="email"
                                className="w-full py-2 pl-3 pr-8 mt-2 bg-white border border-gray-300 rounded-md focus:border-blue-900 text-gray-950"
                                {...register("email")}
                                placeholder="john.doe@edu.devinci.fr"
                            />
                            {errors.email && (
                                <p role="alert" className="mt-1 text-red-500">
                                    {errors.email.message}
                                </p>
                            )}
                        </div>

                        <div className="flex flex-col items-start w-full">
                            <label htmlFor="password">Mot de passe *</label>
                            <input
                                id="password"
                                type="password"
                                className="w-full py-2 pl-3 pr-8 mt-2 bg-white border border-gray-300 rounded-md focus:border-blue-900 text-gray-950"
                                {...register("password")}
                                placeholder="Un mot de passe sécurisé"
                            />
                            {errors.password && (
                                <p role="alert" className="mt-1 text-red-500">
                                    {errors.password.message}
                                </p>
                            )}
                        </div>
                    </div>

                    <Button styleType="primary" type="submit">
                        Je me connecte
                    </Button>
                </form>

                <p className="flex flex-col text-center">
                    Je n'ai pas de 404ID{" "}
                    <span>
                        <a href="/" className="font-medium text-blue-400 underline">
                            M'inscrire
                        </a>
                    </span>
                </p>
            </div>
        </Layout>
    );
}
