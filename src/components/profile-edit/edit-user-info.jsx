import { useState } from "react";
import { cn } from "../../libs/functions";

export default function EditUserInfo({ user }) {

    const [quoteLength, setQuoteLength] = useState(user.quote.length);

    return (
        <div className="flex flex-col items-start gap-6 w-full">
            <div className="flex flex-col items-start gap-1.5 w-full">
                <label htmlFor="email" className="text-gray-300">Email</label>
                <input
                    id="email"
                    type="email"
                    className="w-full p-2 border border-gray-300 rounded-md opacity-50"
                    defaultValue={user.email}
                    disabled
                />
                <p className="text-gray-400 leading-5 text-sm">
                    L'email ne peut pas être modifié après la création du compte.
                </p>
            </div>
            <div className="flex flex-col items-start gap-1.5 w-full">
                <label htmlFor="username" className="text-gray-300">Nom d'utilisateur</label>
                <input
                    id="username"
                    type="text"
                    className="w-full p-2 border border-gray-300 rounded-md text-gray-950 placeholder:text-sm"
                    defaultValue={user.username}
                    placeholder="Ajoutez un nom d'utilisateur"
                    onChange={() => {}}
                />
            </div>
            <div className="flex flex-col items-start gap-1.5 w-full">
                <label htmlFor="quote" className="text-gray-300">Citation</label>
                <textarea
                    id="quote"
                    type="text"
                    className="w-full p-2 border border-gray-300 rounded-md text-gray-950 placeholder:text-sm resize-none"
                    defaultValue={user.quote}
                    placeholder="Je suis..."
                    maxLength={100}
                    onChange={(e) => setQuoteLength(e.target.value.length)}
                />
                <span className={cn(
                    `ml-auto text-gray-300 text-sm`,
                    quoteLength >= 100 && "text-rose-500"
                )}>
                    {quoteLength} / 100
                </span>
            </div>
        </div>
    )
}