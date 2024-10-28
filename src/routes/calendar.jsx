import Layout from "../layout";
import MissionCard from "../components/mission-card";
import Header from "../components/layout/header";
import Menu from "../components/layout/menu";
import Logo from "../components/layout/logo";
/*import {useEffect} from "react";*/

const Asso = () => {

    /*    useEffect(() => {
            fetch(`meta.env.API_URL${'/daily'}`)
                .then((response) => response.json())
                .then((data) => {
                    console.log(data);
                })
                .catch((error) => {
                    console.error(error);
                });
        }, []);*/


    const data = {
        name: "La 808 DeVinci",
        description:
            "Salut, ici la 808 devinci pour vous faire vibrer! Rejoignez nous au Pôle pour commencer vos défis",
        avatar_url: "https://www.shutterstock.com/image-vector/wireframe-icon-thin-outline-style-260nw-1335621422.jpg",
    };

    return (
        <div className="flex items-start gap-4 p-4 border border-blue-900 bg-gray-950 rounded-xl">
            <Logo path={data.avatar_url} alt={data.alt}/>
            <div className="flex flex-col gap-4">
                <h2 className="text-2xl font-medium">{data.name}</h2>
                <p className="text-white opacity-75">{data.description}</p>
            </div>
        </div>
    );
};

const Missions = () => {

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
    return (
        <section className="flex flex-col gap-4">
            <h2 className="text-2xl font-medium">Défis</h2>
            <ul className="flex flex-col gap-4">
                {data.map((mission) => (
                    <li key={mission.id} className="gap-2">
                        <MissionCard mission={mission}/>
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
            <Header title={meta.title}/>
            <div className="flex flex-col gap-8 p-6 mt-16 mb-20 ">
                <div className="flex flex-col items-start gap-4 text-left">
                    <h1 className="text-4xl font-bold">L'asso du jour</h1>
                    <p className="text-base">
                        Relevez les défis que vous propose l’association du jour
                    </p>
                </div>
                <Asso/>
                <Missions/>
            </div>
            <Menu title={meta.title}/>
        </Layout>
    );
}
