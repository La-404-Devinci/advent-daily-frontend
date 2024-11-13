import DailyAssosList from "../components/calendar/daily-assos-list";
import DailyMissionsList from "../components/calendar/daily-missions-list";
import Header from "../components/layout/header";
import Menu from "../components/layout/menu";
import Layout from "../layout";
import { getEventDay } from "../libs/functions";


export default function Calendar() {
    // The event starts on december 2nd
    // We need to substract 1 to the current day to get the right day
    const day = getEventDay();

    const meta = {
        title: "Calendrier",
        description: "Calendrier des défis",
    };

    return (
        <Layout>
            <Header title={meta.title}/>
            <div className="flex flex-col gap-8 p-6 mt-16 mb-20 ">
                <div className="flex flex-col items-start gap-4 text-left">
                    <p className="text-sm text-gray-300">
                        Jour {day} / 18
                    </p>
                    <h1 className="text-4xl text-wrap font-bold">Relève les défis du jour !</h1>
                    <p className="text-sm">
                        De nouveaux défis sont apparus aujourd'hui. Réalisez-les pour gagner des points et des récompenses !
                    </p>
                </div>
                <DailyAssosList />
                <DailyMissionsList />
            </div>
            <Menu />
        </Layout>
    );
}
