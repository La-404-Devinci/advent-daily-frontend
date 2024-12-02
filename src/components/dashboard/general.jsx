import reactImage from "../../assets/react.svg";
import {Card, MiniCard} from "../ui/cards.jsx";
import {Link} from "react-router-dom";
import Logo from "../layout/logo.jsx";
import {CircleDot, MapPin} from "lucide-react";
import React, {useEffect, useState} from "react";
import {StatsBar} from "./stats-bar.jsx";
import useAssociationStore from '../../store/associationStore';

export const General = () => {

    const [nameClubID, setNameClubID] = useState("");
    const {associations, getAssociations} = useAssociationStore();

    useEffect(() => {
        getAssociations();
    }, [getAssociations]);


    const dailyChallenge = localStorage.getItem("daily-challenges-storage");
    const dailyChallengeClubId = JSON.parse(dailyChallenge);
    const nameClub = associations.find((club) => club.id === dailyChallengeClubId?.state?.dailyChallenges[0]?.clubId);

    const data = [
        {
            id: 1,
            title: "Total de points",
            value: "1000",
            description: "avec 65 joueurs qui participent",
        },
        {
            id: 2,
            title: "Utilisateurs",
            value: "65",
            description: "en 4 jours",
        },
        {
            id: 3,
            title: "Défis complétés",
            value: "102",
            description: "avec l'asso du jour",
        },
        {
            id: 4,
            title: "L'asso du jour / Les assos du jour",
            value: nameClub ? nameClub.name : "Aucune association trouvée",
        },
    ];
    const logsData = [
        {
            id: 1,
            username: "Nicolas",
            action: "a ajouté un défi",
            image: reactImage
        },
        {
            id: 2,
            username: "Kan-pas-pesh",
            action: "a modifié son nom",
            image: reactImage
        },
        {
            id: 3,
            username: "Nicolas",
            action: "a réussi à sauter à la corde",
            score: 100,
            image: reactImage
        }

    ]


    const today = new Date();
    const todayISO = new Date(Date.UTC(today.getFullYear(), today.getMonth(), today.getDate())).toISOString();

    const calendarData = associations
        .sort((a, b) => new Date(a.dailyDate) - new Date(b.dailyDate))
        .filter((asso) => asso.dailyDate >= todayISO)
        .slice(0, 7)
        .map((asso) => ({
            id: asso.id,
            location: asso.location,
            avatarUrl: asso.avatarUrl,
            name: asso.name,
            dailyDate: new Date(asso.dailyDate).toLocaleDateString('fr-FR', {
                day: '2-digit',
                month: 'long',
                year: 'numeric'
            })
        }));
    return (
        <>
            <StatsBar data={data}/>
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:grid-rows-1">
                <Card className="flex flex-col gap-10 lg:col-span-7">
                    <h2 className="text-2xl font-bold">Calendrier des assos</h2>
                    <div className="grid grid-cols-2 gap-5 lg:grid-cols-8 lg:grid-rows-1 ">
                        {
                            calendarData.map((asso, index) => (
                                <Link to={`asso/${asso.id}`} key={index}
                                      className={`flex flex-col justify-between items-start border border-blue-700 bg-blue-950 p-5 col-span-1 lg:col-span-2 gap-2 rounded-2xl hover:cursor-pointer ${index >= 4 ? 'hidden lg:flex' : ''}`}>
                                    <Logo path={asso.avatarUrl} alt={asso.id} className={"h-20 w-20 object-fill"}/>
                                    <div className="flex flex-col">
                                        <div className="flex items-center justify-start gap-2">
                                            <MapPin className="w-6 h-6 text-pink-300"/>
                                            <p className='text-xs text-pink-300'>
                                                {
                                                    asso.location === 1 ? 'Arche' : 'Pôle'
                                                }
                                            </p>
                                        </div>
                                        <p className="text-base lg:text-lg font-bold">{asso.dailyDate}</p>
                                    </div>
                                </Link>
                            ))
                        }
                    </div>
                </Card>
                <Card className="flex flex-col gap-10 lg:col-span-5">
                    <div className="flex items-center justify-between">
                        <h2 className="text-2xl font-bold">Notifications</h2>
                        <CircleDot className="w-6 h-6 text-blue-700 animate-ping"/>
                    </div>
                    <div className="flex flex-col gap-5 overflow-y-scroll h-96 no-scrollbar">
                        {
                            logsData.map((log, index) => (

                                <MiniCard key={index} className="transition duration-300 hover:bg-blue-950 ">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-5">
                                            <div className="flex flex-col gap-1">
                                                <Link to={`user/${log.username}`}>
                                                    <h2 className="text-lg font-bold hover:underline">{log.username}</h2>
                                                </Link>
                                                <p className="text-sm">{log.action}</p>
                                            </div>
                                        </div>
                                        {log.score ? <h2 className="font-bold text-2xl text-[#8BA8FA]">
                                            +{log.score}
                                        </h2> : null}
                                    </div>
                                </MiniCard>
                            ))
                        }
                    </div>
                </Card>
            </div>
        </>
    )
}