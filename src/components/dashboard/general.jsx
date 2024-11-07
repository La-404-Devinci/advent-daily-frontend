import reactImage from "../../assets/react.svg";
import {Card, MiniCard} from "../ui/cards.jsx";
import {Link} from "react-router-dom";
import Logo from "../layout/logo.jsx";
import {CircleDot, MapPin} from "lucide-react";
import React from "react";
import {StatsBar} from "./stats-bar.jsx";

export const General = () => {

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
            title: "L'asso du jour / Les assos du jour",
            value: "BDE",
            description: "demain : 3V",
        },
        {
            id: 4,
            title: "Défis complétés",
            value: "102",
            description: "avec l'asso du jour",
        }
    ]
    const calendarData = [
        {
            id: 1,
            day: "2 Décembre",
            location: "Pôle",
            image: reactImage,
            name: "CELEST"
        },
        {
            id: 2,
            day: "2 Décembre",
            location: "Pôle",
            image: reactImage,
            name: "CELEST"
        },
        {
            id: 3,
            day: "2 Décembre",
            location: "Pôle",
            image: reactImage,
            name: "CELEST"
        },
        {
            id: 4,
            day: "2 Décembre",
            location: "Pôle",
            image: reactImage,
            name: "CELEST"
        },
        {
            id: 5,
            day: "2 Décembre",
            location: "Pôle",
            image: reactImage,
            name: "CELEST"
        },
        {
            id: 6,
            day: "2 Décembre",
            location: "Pôle",
            image: reactImage,
            name: "CELEST"
        },
        {
            id: 7,
            day: "2 Décembre",
            location: "Pôle",
            image: reactImage,
            name: "CELEST"
        },
        {
            id: 8,
            day: "2 Décembre",
            location: "Pôle",
            image: reactImage,
            name: "CELEST"
        }
    ]
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

    return (
        <>
            <StatsBar data={data}/>
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:grid-rows-1">
                <Card className="flex flex-col gap-10 lg:col-span-7">
                    <h2 className="text-2xl font-bold">Calendrier des assos</h2>
                    <div className="grid grid-cols-2 gap-5 lg:grid-cols-8 lg:grid-rows-1 ">
                        {
                            calendarData.map((asso, index) => (
                                <Link to={`asso/${asso.name}`} key={index}
                                      className={`flex flex-col justify-between items-start border border-blue-700 bg-blue-950 p-5 col-span-1 lg:col-span-2 gap-2 rounded-2xl hover:cursor-pointer ${index >= 4 ? 'hidden lg:flex' : ''}`}>
                                    <Logo path={asso.image} alt={asso.id} className={"h-20 w-20 object-fill"}/>
                                    <div className="flex flex-col">
                                        <div className="flex items-center justify-start gap-2">
                                            <MapPin className="w-6 h-6 text-pink-300"/>
                                            <p className='text-xs text-pink-300'>{asso.location}</p>
                                        </div>
                                        <p className="text-lg font-bold">{asso.day}</p>
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
                    <div></div>
                </Card>
            </div>
        </>
    )
}