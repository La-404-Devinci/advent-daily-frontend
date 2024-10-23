import Layout from "../layout";
import MissionCard from "../components/missionCard";
import Header from "../components/layout/Header";
import NavBar from "../components/layout/NavBar";

const Missions = () => {
  const missions = [
    {
      points: "+100",
      finish: true,
      id: 1,
      description: "Trouver quoi dire a Nicolas",
    },
    {
      points: "+100",
      finish: false,
      id: 2,
      description:
        "Trouver quoi dire a NicolasTrouver quoi dire a NicolasTrouver quoi dire a NicolasTrouver quoi dire a NicolasTrouver quoi dire a NicolasTrouver quoi dire a NicolasTrouver quoi dire a NicolasTrouver quoi dire a Nicolas",
    },
  ];
  return (
    <section className="flex flex-col gap-4">
      <h2 className="text-2xl font-medium">Défis</h2>

      <ul className="flex flex-col gap-4">
        {missions.map((mission) => (
          <li key={mission.id} className="gap-2">
            <MissionCard mission={mission} />
          </li>
        ))}
      </ul>
    </section>
  );
};

export default function Calendar() {
  const meta = {
    title: "Calendrier",
    description: "Calendrier des défis",
  };

  return (
    <Layout>
      <Header title={meta.title} />
      <div className="p-6">
        <div className="flex flex-col items-start gap-4 text-left">
          <h1 className="text-4xl font-bold">L'asso du jour</h1>
          <p className="text-2xl">Relevez les défis que vous propose l’association du jour</p>
        </div>

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
        <Missions />
      </div>
      <NavBar title={meta.title} />
    </Layout>
  );
}
