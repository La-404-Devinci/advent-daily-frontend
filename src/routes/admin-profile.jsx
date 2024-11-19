import Layout from "../layout.jsx";
import Header from "../components/layout/header.jsx";
import {MiniCard} from "../components/ui/cards.jsx";
import MissionCard from "../components/mission-card.jsx";
import Logo from "../components/layout/logo.jsx";
import reactImage from "../assets/react.svg";
import {useState} from "react";
import {cn} from "../libs/functions";
import {Button} from "../components/buttons/Buttons.jsx";

export default function AdminProfile() {
    const meta = {
        title: "Profil de Kan-a-Pesh",
        description: "Profil de Kan-a-Pesh",
    };

    const [modalOpen, setModalOpen] = useState(false);

    const missions = [
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
        {
            id: "3",
            name: "Trouver quoi dire a Nicolas",
            club_id: "1",
            score: 100,
            finish: false,
        },
    ];

    const [selectedMission, setSelectedMission] = useState(null);

    const hanldeSubmit = () => {
        console.log("submit");
    }

    return (
        <Layout>
            <Header title={meta.title}></Header>
            <div className="flex flex-col gap-8 p-6 mt-16 w-full h-[calc(100vh-4rem)]">
                <div className="flex flex-col items-start gap-8 w-full flex-grow">
                    <div className="flex flex-col gap-3 w-full">
                        <p>Créditez des points à: </p>
                        <MiniCard className="flex gap-3 items-center p-3 rounded-2xl">
                            <Logo path={reactImage} className="h-24 "/>
                            <div className='flex flex-col gap-2'>
                                <h2 className="text-2xl font-bold">Kan-a-Pesh</h2>
                                <p className="text-base">Membre de l'association</p>
                            </div>
                        </MiniCard>
                    </div>
                    <div className="flex flex-col gap-3 w-full">
                        <h2 className="text-2xl font-bold">Sélectionnez le défi réussi</h2>
                        <ul className="flex flex-col gap-3 w-full">
                            {missions.map((mission) => (
                                <li
                                    key={mission.id}
                                    onClick={() => !mission.finish && setSelectedMission(mission)}
                                    className={cn(
                                        "flex gap-3 items-center p-0.5 rounded-2xl",
                                        selectedMission?.id === mission.id && "bg-blue-700",
                                        mission.finish && "cursor-not-allowed"
                                    )}
                                >
                                    <MissionCard mission={mission}/>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
                <Button className="w-full mt-auto" styleType={"primary"} onClick={() => setModalOpen(true)}>Valider</Button>
            </div>

            {modalOpen && (
                <div className="fixed inset-0 flex items-center justify-center z-50 backdrop-blur-md">
                    <div className="fixed inset-0 flex items-center justify-center">Êtes-vous sûr de vouloir créditer ce joueur ?</div>
                    <Button className="w-full mt-auto" styleType={"primary"} onClick={() => setModalOpen(false)}>Valider</Button>
                </div>
            )}
        </Layout>
    );
}