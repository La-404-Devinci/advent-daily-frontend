export default function UserPodium({ user }) {

    const podiumHeights = [
        "h-36",
        "h-32",
        "h-28"
    ]

    return (
        <div className="flex items-center flex-col p-3 w-fit mt-10 gap-4">
            <div className="flex flex-col items-center justify-center gap-1">
                <div className="w-12 h-12 rounded-lg overflow-hidden">
                    <img src={user.avatarUrl} alt="avatar" className="w-full h-full object-contain" />
                </div>
                <div className="text-center">
                    <p className="font-bold">{user.username}</p>
                    <p className="text-sm opacity-75">{user.quote}</p>
                </div>
            </div>
            <div className={cn}>
                <p className="font-black text-2xl">{user.place}</p>
                <div className="text-center">
                    <p className="text-sm font-bold">{user.score}</p>
                    <p className="text-xs opacity-50">pts</p>
                </div>
            </div>
        </div>
    );
}