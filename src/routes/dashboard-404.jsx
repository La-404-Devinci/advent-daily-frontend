import {useEffect, useState} from "react";
import Layout from '../layout';
import Logo from "../components/layout/logo.jsx";
import reactImage from "../assets/react.svg";
import {Card, MiniCard} from "../components/ui/cards.jsx";
import {CircleDot, CloudUpload, Delete, MapPin, SquarePen, Trash, Upload} from "lucide-react";
import {Button} from "../components/buttons/Buttons.jsx";
import {zodResolver} from "@hookform/resolvers/zod";
import {z} from "zod";
import {useForm} from "react-hook-form";
import Input from "../components/ui/input.jsx";
import TextArea from "../components/ui/text-area.jsx";
import {useNavigate, Link} from "react-router-dom";
import Compressor from "compressorjs";

export const StatsBar = ({data, className}) => {
    return (
        <div className={`flex flex-col lg:flex-row gap justify-start gap-5 items-center ${className}`}>
            {data.map((card) => (
                <MiniCard key={card.id} className={"bg-gray-950"}>
                    <div className="flex justify-between items-center gap-2">
                        <h2>{card.title}</h2>
                        <CircleDot className={"h-6 w-6 text-blue-700"}/>
                    </div>
                    <div className="mt-2.5">
                        <h1 className='text-3xl font-bold'>{card.value}</h1>
                        {card.description && <p className="text-sm">{card.description}</p>}
                    </div>
                </MiniCard>
            ))}
        </div>
    )
}

export const GeneralTab = () => {

    const nagivate = useNavigate();

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
            title: "L'asso du jour",
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
                <Card className="lg:col-span-7 gap-10 flex flex-col">
                    <h2 className="text-2xl font-bold">Calendrier des assos</h2>
                    <div className="grid grid-cols-2 lg:grid-cols-8 lg:grid-rows-1 gap-5 ">
                        {
                            calendarData.map((asso, index) => (
                                <Link to={`asso/${asso.name}`} key={index}
                                      className={`flex flex-col justify-between items-start border border-blue-700 bg-blue-950 p-5 col-span-1 lg:col-span-2 gap-2 rounded-2xl hover:cursor-pointer ${index >= 4 ? 'hidden lg:flex' : ''}`}>
                                    <Logo path={asso.image} alt={asso.id} className={"h-20 w-20 object-fill"}/>
                                    <div className="flex flex-col">
                                        <div className="flex gap-2 items-center justify-start">
                                            <MapPin className="h-6 w-6 text-pink-300"/>
                                            <p className='text-xs text-pink-300'>{asso.location}</p>
                                        </div>
                                        <p className="text-lg font-bold">{asso.day}</p>
                                    </div>
                                </Link>
                            ))
                        }
                    </div>
                </Card>
                <Card className="lg:col-span-5 gap-10 flex flex-col">
                    <div className="flex items-center justify-between">
                        <h2 className="text-2xl font-bold">Notifications</h2>
                        <CircleDot className="h-6 w-6 text-blue-700 animate-ping"/>
                    </div>
                    <div className="flex flex-col gap-5 overflow-y-scroll h-96 no-scrollbar">
                        {
                            logsData.map((log, index) => (

                                <MiniCard key={index} className="hover:bg-blue-950 transition duration-300 ">
                                    <div className="flex justify-between items-center">
                                        <div className="flex items-center gap-5">
                                            <Logo path={log.image} alt={log.username}
                                                  className={"h-12 w-12 object-fill"}/>
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

export const Assos = () => {

    const data = [
        {id: 1, title: "Total d'assos", value: 51},
    ];

    const assosData = [
        {id: 1, name: "CELEST", image: reactImage}, {id: 2, name: "CELEST", image: reactImage}, {
            id: 3,
            name: "CELEST",
            image: reactImage
        }, {id: 4, name: "CELEST", image: reactImage}]

    return (



        <div>
            <StatsBar data={data} className="w-fit"/>
            <Card className="mt-6 gap-10 flex flex-col ">
                <div className="flex justify-between items-start">
                    <h2 className="text-2xl font-bold">Les assos</h2>
                    <Button styleType={"primary"} onClick={() => {
                    }} className="w-fit">Ajouter une asso</Button>
                </div>
                <div className="flex flex-col gap-3 max-h-80 overflow-y-scroll no-scrollbar">
                    {
                        assosData.map((asso, index) => (
                            <Link to={`asso/${asso.name}`} key={index}
                                  className={`flex justify-between items-center border border-blue-700 bg-blue-950 p-5  rounded-2xl`}>
                                <div className="flex gap-4 items-center">
                                    <Logo path={asso.image} alt={asso.id} className={"h-20 w-20 object-fill"}/>
                                    <h2 className="text-xl font-bold">{asso.name}</h2>
                                </div>
                                <div className="flex flex-col">
                                    <div className="flex items-center gap-2">
                                        <Link to={`asso/${asso.name}`}>
                                            <Button styleType={"secondary"} className="w-fit"><SquarePen
                                                className="h-6 w-6"/></Button>
                                        </Link>
                                        <Button styleType={"destructive"} className="w-fit"><Trash className="h-6 w-6"/></Button>
                                    </div>
                                </div>
                            </Link>
                        ))
                    }
                </div>
            </Card>
        </div>
    )
}

export const Users = () => {

    const data = [
        {id: 1, title: "Total d'utilisateurs", value: 3012},
    ];

    const usersData = [
        {id: 1, name: "CELEST", image: reactImage}, {id: 2, name: "CELEST", image: reactImage}, {
            id: 3,
            name: "CELEST",
            image: reactImage
        }, {id: 4, name: "CELEST", image: reactImage}]

    return (
        <div>
            <StatsBar data={data} className="w-fit"/>
            <Card className="mt-6 gap-10 flex flex-col ">
                <h2 className="text-2xl font-bold">Utilisateurs</h2>
                <div className="flex flex-col gap-3 max-h-80 overflow-y-scroll no-scrollbar">
                    {
                        usersData.map((user, index) => (
                            <div to={`user/${user.name}`} key={index}
                                 className={`flex justify-between items-center border border-blue-700 bg-blue-950 p-5  rounded-2xl`}>
                                <div className="flex gap-4 items-center">
                                    <Logo path={user.image} alt={user.id} className={"h-20 w-20 object-fill"}/>
                                    <h2 className="text-xl font-bold">{user.name}</h2>
                                </div>
                                <div className="flex flex-col">

                                    <div className="flex items-center gap-2">
                                        <Link to={`user/${user.name}`}>
                                            <Button styleType={"secondary"} className="w-fit"><SquarePen
                                                className="h-6 w-6"/></Button>
                                        </Link>
                                        <Button styleType={"destructive"} className="w-fit"><Trash className="h-6 w-6"/></Button>
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </Card>
        </div>
    )
}

export const Tabs = ({className, activeTab, setActiveTab}) => {
    const handleTab = (id) => {
        return () => {
            setActiveTab(id);
            const object = {value: id, timestamp: Date.now()};
            localStorage.setItem('activeTab', JSON.stringify(object));
        }
    }

    const tabs = [
        {
            id: 1,
            name: "Général",
            content: "Content 1",
        },
        {
            id: 2,
            name: "Les assos",
            content: "Content 3",
        },
        {
            id: 3,
            name: "Les utilisateurs",
            content: "Content 4",
        },
    ]

    return (
        <ul className={`flex bg-[#030712] rounded-md border border-blue-700 p-1.5 ${className}`}>
            {tabs.map((tab) => (
                <li key={tab.id} onClick={handleTab(tab.id)}>
                    <button
                        className={`font-medium py-1.5 px-3 rounded-lg h-full text-left ${tab.id === activeTab ? "bg-blue-700" : ""}`}>
                        {tab.name}
                    </button>
                </li>
            ))}
        </ul>
    )
}

export default function Dashboard404() {

    const [activeTab, setActiveTab] = useState(1);

    useEffect(() => {
        const savedTab = JSON.parse(localStorage.getItem('activeTab'));
        if (savedTab) {
            const now = Date.now();
            if (now - savedTab.timestamp < 300000) { // 5 minutes
                setActiveTab(savedTab.value);
            } else {
                localStorage.removeItem('activeTab');
            }
        }
    }, []);

    return (
        <Layout className="md:max-w-none p-6 md:items-start">
            <header className="flex justify-between w-full">
                <h1 className="text-3xl font-bold text-white">Dashboard</h1>
                <Logo path={reactImage} alt={"React Image"} className={"h-10 w-10"}/>
            </header>
            <Tabs className="my-6" activeTab={activeTab} setActiveTab={setActiveTab}/>
            <div className="flex gap-6 flex-col w-full">
                {activeTab === 1 &&
                    <>
                        <GeneralTab/>
                    </>
                }
                {activeTab === 2 && <><Assos/></>}
                {activeTab === 3 && <><Users/></>}
            </div>
        </Layout>
    )
}