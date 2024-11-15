import MissionCard from "../mission-card";

const data = [
    {
        id: "1",
        name: "Trouver quoi dire a Nicolas",
        club_id: "1",
        score: 100,
        finish: true,
    },
    {
        id: "2",
        name: "Trouver quoi dire a Nicolas",
        club_id: "1",
        score: 100,
        finish: false,
    },
];

const DailyMissionsList = () => {

    /*   useEffect(() => {
           fetch(`meta.env.API_URL${'/daily/challenges'}`)
               .then((response) => response.json())
               .then((data) => {
                   console.log(data);
               })
               .catch((error) => {
                   console.error(error);
               });
       }, []);*/

    return (
        <section className="flex flex-col gap-4">
            <h2 className="text-2xl font-medium">Défis</h2>
            <ul className="flex flex-col gap-2">
                {data.map((mission) => (
                    <li key={mission.id} className="gap-2">
                        <MissionCard mission={mission}/>
                    </li>
                ))}
            </ul>
        </section>
    );
};

export default DailyMissionsList;