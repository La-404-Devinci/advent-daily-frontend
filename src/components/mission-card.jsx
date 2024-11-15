import { Check } from "lucide-react";
import reactImage from "../assets/react.svg";
import { cn } from "../libs/functions";

export default function MissionCard({ mission, logo=false }) {
  return (
    <div className={cn(`
      flex items-center gap-4 p-3 border border-blue-900
      bg-gray-900/75 rounded-xl w-full`, mission.finish && "opacity-50"
      )}>
      <div className="flex items-center justify-center flex-shrink-0 min-w-16" >
        {mission.finish ? (
          <Check className="text-green-700" />
        ) : (
          <h2 className="font-bold text-2xl text-blue-400">
            +{mission.score}
          </h2>
        )}
      </div>

      <div className="w-full flex items-center justify-between gap-2">
        <p className="text-gray-50">{mission.name}</p>
        {logo && (
          <div className="flex items-center justify-center size-8 shrink-0 overflow-hidden bg-gray-900 rounded-lg">
            <img src={reactImage} alt="Logo" className="w-full h-full object-contain" />
          </div>
        )}
      </div>
    </div>
  );
}
