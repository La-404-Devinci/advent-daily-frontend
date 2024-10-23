import { Check } from "lucide-react";

export default function MissionCard({ mission }) {
  return (
    <div className={`flex items-center gap-4 p-3 bg-opacity-50 border border-blue-900 justify-startr justify-left bg-gray-950 rounded-2xl ${mission.finish ? "opacity-40" : ""}`}>
      <div className="flex items-center justify-center flex-shrink-0 min-w-16" >
        {mission.finish ? (
          <Check className="text-[#93ACF1]" />
        ) : (
          <h2 className="font-bold text-2xl text-[#8BA8FA]">
            {mission.points}
          </h2>
        )}
      </div>

      <p>{mission.description}</p>
    </div>
  );
}
