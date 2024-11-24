import { ChevronDown, Undo2 } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
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

async function grantPoints(userId, challengeId, token, grant = true) {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/granters/${grant ? "grant" : "ungrant"}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
            "Authorization-Type": "granter",
        },
        body: JSON.stringify({
            userUuid: userId,
            challengeId: challengeId.toString(),
        }),
    });

    return {
        response: await response.json(),
        grant: grant,
    };
}

const meta = {
    title: "Créditer - Kan-a-Pesh",
    description: "Profil de Kan-a-Pesh",
};

export default function AdminProfile() {
    const { userUuid } = useParams();

    const [modalOpen, setModalOpen] = useState(false);
    const [selectedChallenge, setSelectedChallenge] = useState(null);

    const { profiles, getProfile, revalidateProfile } = useProfileStore();
    const { dailyChallenges, getDailyChallenges } = useDailyChallengesStore();

    const token = JSON.parse(localStorage.getItem("grantersToken")).token;

    useEffect(() => {
        if (!userUuid) return;
        getProfile(userUuid);
    }, [userUuid, getProfile]);

    useEffect(() => {
        getDailyChallenges();
    }, [getDailyChallenges]);

    const handleSubmit = async () => {
        try {
            const { response, grant } = await grantPoints(userUuid, selectedChallenge.id, token, !userChallengesHashMap[selectedChallenge.id]);

            if (!response?.response[0]?.success) {
                toast.error("Une erreur est survenue lors de la créditation du joueur", {
                    className: "border-red-800 bg-gray-900",
                    classNames: {
                        icon: "text-red-800",
                    },
                });
                throw new Error(response?.response[0]?.error);
            }

            toast.success(`Les points du joueur ont été ${grant ? "crédités" : "révoqués"} avec succès !`, {
                className: "border-green-800 bg-gray-900",
                classNames: {
                    icon: "text-green-800",
                },
            });
            revalidateProfile(userUuid);
            setSelectedChallenge(null);
            setModalOpen(false);
        } catch (error) {
            console.error(error);
        }
    };

    const handleUndo = (challenge) => {
        setSelectedChallenge(challenge);
        setModalOpen(true);
    };

    const userChallengesHashMap = useMemo(() => {
        return (
            profiles[userUuid]?.challenges?.reduce((acc, challenge) => {
                acc[challenge.id] = challenge;
                return acc;
            }, {}) || {}
        );
    }, [profiles, userUuid]);

    return (
        <Layout>
            <Header title="Créditer un joueur"></Header>
            <div className="flex flex-col justify-between gap-8 p-6 mt-16 min-h-[calc(100svh-4rem)] w-full">
                <div className="flex flex-col items-start gap-8 w-full flex-grow">
                    <div className="flex flex-col gap-3 w-full">
                        <MiniCard className="flex gap-3 items-center p-3 rounded-2xl">
                            <Logo path={profiles[userUuid]?.user?.avatarUrl || reactImage} className="h-20 shrink-0" />
                            <div className="flex flex-col">
                                <h2 className="text-2xl font-bold">{profiles[userUuid]?.user?.username}</h2>
                                {profiles[userUuid]?.user?.quote ? (
                                    <p className="text-gray-200">{profiles[userUuid]?.user?.quote}</p>
                                ) : (
                                    <p className="text-gray-500">Aucune citation</p>
                                )}
                            </div>
                        </MiniCard>
                    </div>
                    <div className="flex flex-col gap-3 w-full">
                        <h2 className="text-2xl font-bold">Sélectionnez le défi validé :</h2>
                        {dailyChallenges.length === 0 ? (
                            <p className="text-gray-400 text-lg">Aucun défi disponible</p>
                        ) : (
                            <ul className="flex flex-col gap-3 w-full">
                                {dailyChallenges.map((challenge) => (
                                    <li
                                        key={challenge.id}
                                        onClick={() => !userChallengesHashMap[challenge.id] && setSelectedChallenge(challenge)}
                                        className={cn(
                                            "rounded-xl relative",
                                            selectedChallenge?.id === challenge.id && !userChallengesHashMap[challenge.id] ? "bg-blue-800" : "cursor-pointer",
                                        )}
                                    >
                                        <MissionCard
                                            mission={{
                                                ...challenge,
                                                finish: !!userChallengesHashMap[challenge.id],
                                            }}
                                            className={selectedChallenge?.id === challenge.id ? "opacity-100" : ""}
                                        />
                                        {!!userChallengesHashMap[challenge.id] && (
                                            <Button 
                                                styleType="secondary" 
                                                className="absolute top-1/2 -translate-y-1/2 right-3 size-8"
                                                onClick={() => handleUndo(challenge)}
                                            >
                                                <Undo2 className="size-4" />
                                            </Button>
                                        )}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </div>
                <Button
                    className="w-full"
                    styleType="primary"
                    onClick={() => setModalOpen(true)}
                    disabled={!selectedChallenge || !!userChallengesHashMap[selectedChallenge?.id]}
                >
                    Créditer les points
                </Button>
            </div>

            {modalOpen && selectedChallenge && (
                <>
                    {userChallengesHashMap[selectedChallenge?.id] ? (
                        <div
                            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border
                        border-blue-950 rounded-2xl bg-[#030712] w-11/12 max-w-[30rem] z-50 flex flex-col items-center gap-2"
                        >
                            <div className="w-full py-4 px-6">
                                <h3 className="text-lg text-gray-50 font-semibold">Êtes-vous sûr de vouloir révoquer les points de ce joueur ?</h3>
                                <p className="mt-2 text-sm text-gray-300">Révoquer les points est une action qui a un impact le classement.</p>
                            </div>
                            <div className="py-4 px-4 w-full border-t border-b border-blue-950">
                                <div className="w-full max-w-80 flex flex-col items-center gap-3 mx-auto">
                                    <MissionCard mission={selectedChallenge} />
                                    <Undo2 className="size-7" />
                                    <MiniCard className="flex p-3 rounded-xl">
                                        <Logo path={profiles[userUuid]?.user?.avatarUrl || reactImage} className="shrink-0" />
                                        <h2 className="text-xl font-bold">{profiles[userUuid]?.user?.username}</h2>
                                    </MiniCard>
                                </div>
                            </div>
                            <div className="w-full py-4 px-6 flex flex-col gap-2">
                                <Button className="w-full" styleType="primary" onClick={handleSubmit}>
                                    Révoquer les points
                                </Button>
                                <Button className="w-full" styleType="secondary" onClick={() => setModalOpen(false)}>
                                    Annuler
                                </Button>
                            </div>
                        </div>
                    ) : (
                        <div
                            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border
                        border-blue-950 rounded-2xl bg-[#030712] w-11/12 max-w-[30rem] z-50 flex flex-col items-center gap-2"
                        >
                            <div className="w-full py-4 px-6">
                                <h3 className="text-lg text-gray-50 font-semibold">Êtes-vous sûr de vouloir créditer ce joueur ?</h3>
                                <p className="mt-2 text-sm text-gray-300">Créditer un joueur est une action qui a un impact le classement.</p>
                            </div>
                            <div className="py-4 px-4 w-full border-t border-b border-blue-950">
                                <div className="w-full max-w-80 flex flex-col items-center gap-3 mx-auto">
                                    <MissionCard mission={selectedChallenge} />
                                    <ChevronDown className="size-7" />
                                    <MiniCard className="flex p-3 rounded-xl">
                                        <Logo path={profiles[userUuid]?.user?.avatarUrl || reactImage} className="shrink-0" />
                                        <h2 className="text-xl font-bold">{profiles[userUuid]?.user?.username}</h2>
                                    </MiniCard>
                                </div>
                            </div>
                            <div className="w-full py-4 px-6 flex flex-col gap-2">
                                <Button className="w-full" styleType="primary" onClick={handleSubmit}>
                                    Créditer les points
                                </Button>
                                <Button className="w-full" styleType="secondary" onClick={() => setModalOpen(false)}>
                                    Annuler
                                </Button>
                            </div>
                        </div>
                    )}
                    <div
                        className="fixed top-0 left-0 w-full h-full bg-black/50 z-10 backdrop-blur-sm filter-active"
                        onClick={() => setModalOpen(false)}
                    />
                </>
            )}
        </Layout>
    );
}
