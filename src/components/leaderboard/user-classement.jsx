import NoImage from "../../assets/no-image-found.png";
import Image from "../image";

export default function UserClassement({ user, place }) {
    return (
        <div className="flex items-center gap-3 p-4 border border-gray-800 bg-gray-900/75 rounded-2xl relative">
            <div
                className="flex items-center justify-center flex-col px-2 py-1 h-6 absolute -top-3 left-3 bg-blue-950
             rounded-lg"
            >
                <p className="text-gray-300 text-center font-normal text-xs">{place}.</p>
            </div>
            <div className="size-12 overflow-hidden shrink-0 rounded-lg">
                {user.avatarUrl && (
                    <Image 
                        blobUrl={user.avatarUrl} 
                        fallback={NoImage}
                        className="size-full object-contain" 
                    />
                )}
            </div>
            <div className="flex justify-between items-center gap-1 w-full">
                <div className="flex flex-col gap-0.5">
                    <p className="text-gray-50">{user.username}</p>
                    {user.quote && <p className="text-gray-400 text-xs">{user.quote}</p>}
                </div>
                <p className="text-gray-50">
                    <span className="font-extrabold">{user.score}</span>
                    <span className="text-gray-400 ml-1">pts</span>
                </p>
            </div>
        </div>
    );
}
