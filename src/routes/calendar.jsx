import Layout from "../layout";
import MissionCard from "../components/missionCard";

export default function Calendar() {
  const missions = [
    {
      points: "+100",
      finish : true,
      id: 1,
      description: "Trouver quoi dire a Nicolas",
    },
    {
      points: "+100",
      finish : false,
      id: 2,
      description: "Trouver quoi dire a NicolasTrouver quoi dire a NicolasTrouver quoi dire a NicolasTrouver quoi dire a NicolasTrouver quoi dire a NicolasTrouver quoi dire a NicolasTrouver quoi dire a NicolasTrouver quoi dire a Nicolas",
    },
  ];

  return (
    <Layout>
      <div className="p-6">
        <h4>Calendar</h4>
        <h1>L'asso du jour</h1>
        <p>Relevez les défis que vous propose l’association du jour</p>
        <div>
          <div>
            <img src="/"></img>
          </div>
          <div>
            <h2>La 808 DeVinci</h2>
            <p>
              Salut, ici la 808 devinci pour vous faire vibrer! Rejoignez nous
              au Pôle pour commencer vos défis
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <h2>Défis</h2>
          <div>
          <ul className="flex flex-col gap-4 mt-4">
            {missions.map((mission) => (
               
                <li key={mission.id} className="gap-2">
                <MissionCard mission={mission} />
                </li>
             
            ))}
            </ul>
          </div>
        </div>
      </div>
    </Layout>
  );
}
