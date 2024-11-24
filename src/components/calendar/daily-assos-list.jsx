import { useEffect } from "react";
import useDailyClubsStore from "../../store/dailyClubsStore";
import Logo from "../layout/logo";

const DailyAssosList = () => {
    const { dailyClubs, getDailyClubs } = useDailyClubsStore();

    // Get the daily clubs
    useEffect(() => {
        getDailyClubs();
    }, [getDailyClubs]);

    return (
        <section className="flex flex-col gap-2">
            {dailyClubs.map((asso, index) => (
                <div key={`asso::daily::${index}`} className="flex items-start gap-4 p-4 border border-blue-900 bg-gray-900 rounded-xl">
                    <Logo path={asso.avatarUrl} alt={asso.alt} className="size-16" />
                    <div className="flex flex-col gap-1">
                        <h2 className="text-xl font-medium">{asso.name}</h2>
                        <p className="text-gray-300 text-sm leading-tight">{asso.description}</p>
                    </div>
                </div>
            ))}
        </section>
    );
};

export default DailyAssosList;
