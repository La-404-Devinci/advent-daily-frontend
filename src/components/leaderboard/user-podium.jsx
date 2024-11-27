import NoImage from "../../assets/no-image-found.png";
import { cn } from "../../libs/functions";
import Image from "../image";

const podiumHeights = ["h-52", "h-44", "h-36"];

export default function UserPodium({ user, place, isAsso }) {
    
    return (
        <div className={cn(`flex items-center flex-col flex-1 p-3 w-fit mt-10 gap-4 flex-grow`, place === 1 && "order-first")}>
            <div className="flex flex-col items-center justify-center gap-1">
                <div className="w-12 h-12 rounded-lg overflow-hidden">
                    <Image 
                        blobUrl={user.avatarUrl} 
                        fallback={NoImage}
                        className="w-full h-full object-contain"
                        isAsso={isAsso}
                    />
                </div>
                <div className="text-center max-w-13">
                    <p className="font-bold">{user.username}</p>
                    {user.quote && <p className="text-xs opacity-50 break-all">{user.quote}</p>}
                </div>
            </div>
            <div
                className={cn(
                    `flex flex-col items-center gap-1 w-full bg-gradient-to-t from-blue-500/0
                 to-blue-600 pt-3 rounded-t-lg`,
                    podiumHeights[place],
                )}
            >
                <p className="text-4xl">{place === 0 ? "🥇" : place === 1 ? "🥈" : "🥉"}</p>
                <div className="text-center mt-2">
                    <p className="font-extrabold text-lg">{user.score}</p>
                    <p className="text-sm opacity-50">pts</p>
                </div>
            </div>
        </div>
    );
}
