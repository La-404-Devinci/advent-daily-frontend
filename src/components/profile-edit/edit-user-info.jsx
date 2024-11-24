import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { cn } from "../../libs/functions";
import useMeStore from "../../store/meStore";
import useProfileStore from "../../store/profileStore";
import { Button } from "../buttons/Buttons";

const schema = z.object({
    username: z.string().min(1).max(20),
    quote: z.string().max(50).optional(),
});

async function updateProfile(data, me) {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/users/${me}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("authToken")}`,
        },
        body: JSON.stringify({
            username: data.username,
            quote: data.quote,
        }),
    });

    if (!response.ok) {
        throw new Error("Une erreur est survenue lors de la mise à jour du profil");
    }

    return response.json();
}

export default function EditUserInfo({ user }) {

    const email = useMemo(() => localStorage.getItem("email"), []);
    const { me, getMe } = useMeStore();
    const { revalidateProfile } = useProfileStore();

    useEffect(() => {
        getMe();
    }, [getMe]);

    const { register, handleSubmit, watch } = useForm({
        resolver: zodResolver(schema),
        defaultValues: {
            username: user.username,
            quote: user.quote ?? "",
        },
    });

    const onSubmit = async (data) => {
        try {
            await updateProfile(data, me);
            await revalidateProfile(me);
            toast.success("Le profil a été mis à jour avec succès !", {
                className: "border-green-800 bg-gray-900",
                classNames: {
                    icon: "text-green-800",
                },
            });
        } catch (error) {
            toast.error(error.message, {
                className: "border-red-800 bg-gray-900",
                classNames: {
                    icon: "text-red-800",
                },
            });
        }
    }

    return (
        <form className="flex flex-col items-start gap-6 w-full" onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col items-start gap-1.5 w-full">
                <label htmlFor="email" className="text-gray-300">Email</label>
                <input
                    id="email"
                    type="email"
                    className="w-full p-2 border border-gray-300 rounded-md"
                    defaultValue={email}
                    disabled
                />
                <p className="text-gray-400 leading-5 text-sm">
                    L&apos;email ne peut pas être modifié après la création du compte.
                </p>
            </div>
            <div className="flex flex-col items-start gap-1.5 w-full">
                <label htmlFor="username" className="text-gray-300">Nom d&apos;utilisateur</label>
                <input
                    id="username"
                    type="text"
                    className="w-full p-2 border border-gray-300 rounded-md text-gray-950 placeholder:text-sm"
                    placeholder="Ajoutez un nom d'utilisateur"
                    maxLength={20}
                    {...register("username")}
                />
                <span className={cn(
                    `ml-auto text-gray-300 text-sm`,
                    watch("username")?.length >= 20 && "text-rose-500"
                )}>
                    {watch("username")?.length} / 20
                </span>
            </div>
            <div className="flex flex-col items-start gap-1.5 w-full">
                <label htmlFor="quote" className="text-gray-300">Citation</label>
                <textarea
                    id="quote"
                    type="text"
                    className="w-full p-2 border border-gray-300 rounded-md text-gray-950 placeholder:text-sm resize-none"
                    placeholder="Je suis..."
                    maxLength={50}
                    {...register("quote")}
                />
                <span className={cn(
                    `ml-auto text-gray-300 text-sm`,
                    watch("quote")?.length >= 50 && "text-rose-500"
                )}>
                    {watch("quote")?.length} / 50
                </span>
            </div>
            <div 
                className={cn(`
                    flex p-4 gap-4 justify-center items-center fixed bottom-20 left-0 right-0 
                    bg-gradient-to-t from-black/100 to-black/0 transition-all duration-200`,
                    !watch("username") || !watch("quote") && "opacity-0 bottom-0"
                )}
            >
                <Button 
                    styleType="primary" 
                    className="flex-1 max-w-[30rem]"
                    type="submit"
                    disabled={!watch("username") || !watch("quote")}
                >
                    Sauvegarder
                </Button>
            </div>
        </form>
    )
}