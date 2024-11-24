import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { Button } from "../components/buttons/Buttons";
import Layout from "../layout";
import { useEffect } from "react";

export default function Root() {
    const navigate = useNavigate();

    const schema = z.object({
        email: z
            .string()
            .email({ message: "Email invalide" })
            .regex(/(edu\.devinci\.fr|devinci\.fr)$/, {
                message: "L'email de ton compte doit être de type 'edu.devinci.fr' ou 'devinci.fr'",
            }),
    });

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(schema),
    });

    const onSubmit = async (data) => {
        navigate("/confirmation-email", {
            state: { email: data.email },
        });
    };

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) return;

        fetch(`${import.meta.env.VITE_API_URL}/auth/me`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        }).then((res) => {
            if (res.ok) {
                navigate("/calendar");
            }
        });
    });

    return (
        <Layout>
            <div className="flex flex-col justify-between min-h-svh px-6 py-32 w-full">
                <div className="text-center">
                    <h1 className="text-5xl font-bold">Bienvenue !</h1>
                    <p className="mt-4 text-sm text-gray-300">
                        Gagne des points en participant à des défis organisés par différentes associations au pôle Léonard de Vinci.
                    </p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col justify-start w-full gap-4">
                    <div className="flex flex-col items-start max-w-full gap-4">
                        <div className="flex flex-col items-start w-full">
                            <label htmlFor="email">Email *</label>
                            <input
                                className="w-full py-2 pl-3 pr-8 mt-2 bg-white border border-gray-300 rounded-md 
                                focus:border-blue-900 text-gray-950"
                                {...register("email", {
                                    required: true,
                                    pattern: /edu\.devinci\.fr|devinci\.fr$/,
                                })}
                                placeholder="john.doe@edu.devinci.fr"
                            />
                            {errors.email && (
                                <p role="alert" className="mt-1 text-rose-500 w-full leading-tight">
                                    {errors.email.message}
                                </p>
                            )}
                        </div>
                    </div>

                    <Button styleType="primary" type="submit">
                        Je reçois mon email
                    </Button>
                </form>

                <p className="flex flex-col text-center">
                    J&apos;ai déjà un 404ID{" "}
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
