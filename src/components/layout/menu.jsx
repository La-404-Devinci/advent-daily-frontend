import { CalendarDays, ChartNoAxesColumn, UserRound } from "lucide-react";
import { useLocation } from "react-router-dom";
import { cn } from "../../libs/functions";

const Items_NavBar = [
  {
    title: "Calendrier",
    path: "/calendar",
    icon: <CalendarDays className="w-6 h-6" />,
  },
  {
    title: "Profil",
    path: "/me",
    icon: <UserRound className="w-6 h-6" />,
  },
  {
    title: "Classement",
    path: "/leaderboard",
    icon: <ChartNoAxesColumn className="w-6 h-6" />,
  },
];

export default function Menu() {
  
  const pathname = useLocation().pathname;  
  
  return (
    <nav className="fixed bottom-0 left-0 z-50 flex items-center justify-between w-full 
      h-20 px-4 m-auto text-gray-300 bg-gray-950 sm:left-1/2 sm:-translate-x-1/2"
    >
      <ul className="flex items-center justify-between gap-1 w-full max-w-[30rem] mx-auto">
        {Items_NavBar.map((item) => (
          <li key={`menu:${item.title}`} className="flex-1 h-full">
            <a
              href={item.path}
              className={cn(
                "flex flex-col items-center gap-2 py-3 text-xl",
                pathname.includes(item.path)
                  ? "text-gray-50 bg-blue-800/25 font-semibold"
                  : "hover:bg-blue-950/25"
              )}
            >
              {item.icon}
              <p className={`text-xs`}>{item.title}</p>
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
