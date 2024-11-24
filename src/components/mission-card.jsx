import { Check } from "lucide-react";
import NoImage from "../assets/no-image-found.png";
import { cn } from "../libs/functions";

export default function MissionCard({ mission, logo = false, className }) {
    return (
        <div
            className={cn(
                `
      flex items-center gap-4 p-3 border border-blue-900 h-auto
      bg-gray-900/75 rounded-xl w-full text-wrap`,
                mission.finish && "opacity-50 order-1",
                className,
            )}
        >
            <div className="flex items-center justify-center shrink-0 min-w-16">
                {mission.finish ? (
                    <Check className="text-green-700" />
                ) : (
                    <h2 className="font-bold text-2xl text-blue-400">+{mission.score}</h2>
                )}
            </div>

            <div className="w-full flex items-center justify-between gap-2">
                <p className="text-gray-50 text-wrap">{mission.name}</p>
                {logo && (
                    <div className="flex items-center justify-center size-8 shrink-0 overflow-hidden bg-gray-800 rounded-lg">
                        <img 
                            src={logo} 
                            alt="logo association" 
                            className="w-full h-full object-contain"
                            onError={(e) => {
                                e.target.onerror = null; // Prevent infinite loop
                                e.target.src = NoImage; // Replace with your fallback image
                            }}
                        />
                    </div>
                )}
            </div>
        </div>
    );
}
