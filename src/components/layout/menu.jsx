import { Home, Star, UserRound } from "lucide-react";
import { useLocation } from "react-router-dom";
import { cn } from "../../libs/functions";

const Items_NavBar = [
  {
    title: "Calendrier",
    path: "/calendar",
    icon: <Home className="w-6 h-6" />,
  },
  {
    title: "Profil",
    path: "/me",
    icon: <UserRound className="w-6 h-6" />,
  },
  {
    title: "Classement",
    path: "/leaderboard",
    icon: <Star className="w-6 h-6" />,
  },
];

export default function Menu() {
  
  const pathname = useLocation().pathname;  
  
  return (
    <nav className="fixed bottom-0 left-0 z-10 flex items-center justify-between w-full h-20 px-4 m-auto text-gray-300 bg-black sm:left-1/2 sm:-translate-x-1/2">
      <ul className="flex items-center justify-between max-w-[30rem] gap-2 mx-auto">
        {Items_NavBar.map((item) => (
          <li key={`menu:${item.title}`} className="w-28 h-full">
            <a
              href={item.path}
              className={cn(
                "flex flex-col items-center gap-2 p-3 text-xl rounded-md",
                pathname.includes(item.path)
                  ? "text-blue-800"
                  : "hover:bg-blue-950 hover:bg-opacity-40"
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
