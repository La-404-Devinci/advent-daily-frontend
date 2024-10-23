import { Home, UserRound, Star } from "lucide-react";

export default function NavBar({ title }) {
  const Items_NavBar = [
    {
      title: "Calendrier",
      path: "/calendar",
      icon: <Home className={`w-6 h-6 ${title === "Calendrier" ? "text-blue-700" : ""}`} />,
    },
    {
      title: "Profil",
      path: "/profile",
      icon: <UserRound className={`w-6 h-6 ${title === "Profil" ? "text-blue-700" : ""}`} />,
    },
    {
      title: "Classement",
      path: "/classment",
      icon: <Star className={`w-6 h-6 ${title === "Classement" ? "text-blue-700" : ""}`} />,
    },
  ];
  return (
    <nav className="fixed bottom-0 left-0 z-10 flex items-center justify-between w-full h-20 px-4 m-auto text-white bg-black sm:w-[30rem] sm:left-1/2 sm:-translate-x-1/2">
      <ul className="flex items-center justify-between w-full gap-2">
        {Items_NavBar.map((item) => (
          <li key={item.title} className="w-40 h-full">
            <a
              href={item.path}
              className="flex flex-col items-center gap-2 p-3 text-xl"
            >
              {item.icon}
              <p className={`text-xs ${title === item.title ? "text-blue-700 opacity-75" : ""}`}>{item.title}</p>
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
