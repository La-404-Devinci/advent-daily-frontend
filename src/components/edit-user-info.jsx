export default function EditUserInfo({ user }) {
    return (
        <div className="flex flex-col items-start gap-6">
            <div className="flex flex-col items-start gap-1.5 opacity-50">
                <p>Email</p>
                <input
                    type="email"
                    className="w-96 p-2 border border-gray-300 rounded-md"
                    value={user.email}
                    disabled
                />
                <p className="text-[#64748B]">L'email ne peut pas être modifié après la création du compte.</p>
            </div>
            <div className="flex flex-col items-start gap-1.5">
                <p>Nom d'utilisateur</p>
                <input
                    type="text"
                    className="w-96 p-2 border border-gray-300 rounded-md text-black"
                    value={user.username}
                />
            </div>
            <div className="flex flex-col items-start gap-1.5">
                <p>Citation</p>
                <input
                    type="text"
                    className="w-96 p-2 border border-gray-300 rounded-md text-black"
                    value={user.quote}
                />
            </div>
        </div>
    )
}