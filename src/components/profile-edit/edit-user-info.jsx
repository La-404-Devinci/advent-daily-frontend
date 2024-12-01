import { useMemo } from "react";
import { cn } from "../../libs/functions";

export default function EditUserInfo({ register, watch }) {    

    const email = useMemo(() => localStorage.getItem("email"), []);

    return (
        <div className="flex flex-col items-start gap-6 w-full">
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
        </div>
    )
}