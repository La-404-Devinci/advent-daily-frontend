import { ChevronsDown } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import reactImage from "../assets/react.svg";
import { Button } from "../components/buttons/Buttons.jsx";
import Header from "../components/layout/header.jsx";
import Logo from "../components/layout/logo.jsx";
import MissionCard from "../components/mission-card.jsx";
import { MiniCard } from "../components/ui/cards.jsx";
import Layout from "../layout.jsx";
import { cn } from "../libs/functions.js";
import useDailyChallengesStore from "../store/dailyChallengesStore.js";
import useProfileStore from "../store/profileStore.js";

async function grantPoints(userId, challengeId) {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/granters/grant`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${localStorage.getItem("token")}`,
            "Authorization-Type": "granter"
        },
        body: JSON.stringify({
            userUuid: userId,
            challengeId: challengeId.toString(),
        }),
    });

    return response.json();
}

const meta = {
    title: "Créditer - Kan-a-Pesh",
    description: "Profil de Kan-a-Pesh",
};

export default function AdminProfile() {
    const { userUuid } = useParams();

    const [modalOpen, setModalOpen] = useState(false);
    const [selectedChallenge, setSelectedChallenge] = useState(null);

    const { profiles,  getProfile, revalidateProfile } = useProfileStore();
    const { dailyChallenges, getDailyChallenges } = useDailyChallengesStore();
    
    useEffect(() => {
        if (!userUuid) return;
        getProfile(userUuid);
    }, [userUuid, getProfile]);

    useEffect(() => {
        getDailyChallenges();
    }, [getDailyChallenges]);

    const handleSubmit = async () => {
        try {
            const { response } = await grantPoints(userUuid, selectedChallenge.id);

            if (!response[0].success) {
                throw new Error(response[0].error);
            }
            
            // toast.success("Points crédités avec succès");

            revalidateProfile(userUuid);
            setSelectedChallenge(null);
            setModalOpen(false);
        } catch (error) {
            console.error(error)
        }  
    }

    const userChallengesHashMap = useMemo(() => {
        return profiles[userUuid]?.challenges?.reduce((acc, challenge) => {
            acc[challenge.id] = challenge;
            return acc;
        }, {}) || {};
    }, [profiles, userUuid]);

    return (
        <Layout>
            <Header title={meta.title}></Header>
            <div className="flex flex-col gap-8 p-6 mt-16 w-full">
                <div className="flex flex-col items-start gap-8 w-full flex-grow">
                    <div className="flex flex-col gap-3 w-full">
                        <MiniCard className="flex gap-3 items-center p-3 rounded-2xl">
                            <Logo path={profiles[userUuid]?.user?.avatarUrl || reactImage} className="h-20 shrink-0"/>
                            <div className='flex flex-col'>
                                <h2 className="text-2xl font-bold">{profiles[userUuid]?.user?.username}</h2>
                                {profiles[userUuid]?.user?.association 
                                    ? (
                                        <p className="text-gray-200">Membre de l&apos;association {profiles[userUuid]?.user?.association}</p>
                                    )
                                    : (
                                        <p className="text-gray-400">Joueur sans association</p>
                                    )
                                }
                            </div>
                        </MiniCard>
                    </div>
                    <div className="flex flex-col gap-3 w-full">
                        <h2 className="text-2xl font-bold">
                            Sélectionnez le défi validé :
                        </h2>
                        <ul className="flex flex-col gap-3 w-full">
                            {dailyChallenges.map((challenge) => (
                                <li
                                    key={challenge.id}
                                    onClick={() => !userChallengesHashMap[challenge.id] && setSelectedChallenge(challenge)}
                                    className={cn(
                                        "rounded-xl",
                                        selectedChallenge?.id === challenge.id 
                                            ? "bg-blue-800"
                                            : "cursor-pointer",
                                        userChallengesHashMap[challenge.id] && "cursor-not-allowed",
                                    )}
                                >
                                    <MissionCard mission={{...challenge, finish: !!userChallengesHashMap[challenge.id]}}/>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
                <Button 
                    className="w-full mt-auto" 
                    styleType="primary" 
                    onClick={() => setModalOpen(true)}
                    disabled={!selectedChallenge}
                >
                    Créditer les points
                </Button>
            </div>

            {modalOpen && selectedChallenge && (
                <>  
                    <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border
                        border-blue-950 rounded-2xl bg-[#030712] w-11/12 max-w-[30rem] z-50 flex flex-col items-center gap-2">
                        <div className='w-full py-4 px-6'>
                            <h3 className="text-lg text-gray-50 font-semibold">
                                Êtes-vous sûr de vouloir créditer ce joueur ?
                            </h3>
                            <p className="mt-2 text-sm text-gray-300">
                                Créditer un joueur est une action irréversible qui a un impact le classement.
                            </p>
                        </div>
                        <div 
                            className="py-4 px-4 w-full border-t border-b border-blue-950"
                        >
                            <div className="w-full max-w-80 flex flex-col items-center gap-3 mx-auto">
                                <MissionCard mission={selectedChallenge}/>
                                <ChevronsDown className="size-7" />
                                <MiniCard className="flex p-3 rounded-xl">
                                    <Logo path={reactImage} className="shrink-0"/>
                                    <h2 className="text-xl font-bold">Kan-a-Pesh</h2>
                                </MiniCard>
                            </div>
                        </div>
                        <div className="w-full py-4 px-6 flex flex-col gap-2">
                            <Button  
                                className="w-full"
                                styleType="primary"
                                onClick={handleSubmit}
                            >
                                Confirmer le crédit
                            </Button>
                            <Button 
                                className="w-full"
                                styleType="secondary" 
                                onClick={() => setModalOpen(false)}
                            >
                                Annuler
                            </Button>
                        </div>
                    </div>
                    <div 
                        className="fixed top-0 left-0 w-full h-full bg-black/50 z-10 backdrop-blur-sm filter-active"
                        onClick={() => setModalOpen(false)}
                    />
                </>
            )}

        </Layout>
    );
}