import { cn } from "../libs/functions";

export default function UserClassement({ user }) {
    return (
        <div className="flex items-center gap-2 p-4 border border-[#172554] bg-[#030712] bg-opacity-50 rounded-2xl relative">
            <div className="flex items-center justify-center flex-col px-2 py-1 h-6 absolute -top-3 left-3 bg-[#111827] rounded-lg">
                <p className="text-[#8BA8FA] text-center font-normal text-xs">{user.place}.</p>
            </div>
            <img src={user.avatarUrl} alt="avatar" className="w-12 h-12 shrink-0 rounded-lg"/>
            <div className="flex flex-col justify-center gap-0.5 flex-1">
                <div className="flex gap-0.5">
                    <p className="flex-1 text-white font-medium">{user.username}</p>
                    <p className="font-bold text-white">{user.score}</p>
                    <p className="text-white/50 text font-normal">pts</p>
                </div>
                <p className="text-white/75 text-xs">{user.quote}</p>
            </div>
        </div>
    );
}