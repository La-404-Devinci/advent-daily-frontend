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

export const StatsBar = ({data}) => {
    return (
        <div className="flex flex-col lg:flex-row gap justify-start gap-5 items-center w-full">
            {data.map((card) => (
                <MiniCard key={card.id} className={"bg-gray-950"}>
                    <div className="flex justify-between items-center">
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
            image: reactImage
        },
        {
            id: 2,
            day: "2 Décembre",
            location: "Pôle",
            image: reactImage
        },
        {
            id: 3,
            day: "2 Décembre",
            location: "Pôle",
            image: reactImage
        },
        {
            id: 4,
            day: "2 Décembre",
            location: "Pôle",
            image: reactImage
        },
        {
            id: 5,
            day: "2 Décembre",
            location: "Pôle",
            image: reactImage
        },
        {
            id: 6,
            day: "2 Décembre",
            location: "Pôle",
            image: reactImage
        },
        {
            id: 7,
            day: "2 Décembre",
            location: "Pôle",
            image: reactImage
        },
        {
            id: 8,
            day: "2 Décembre",
            location: "Pôle",
            image: reactImage
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
                                <div
                                    className={`flex flex-col justify-between items-start border border-blue-700 bg-blue-950 p-5 col-span-1 lg:col-span-2 gap-2 rounded-2xl ${index >= 4 ? 'hidden lg:flex' : ''}`}
                                    key={index}>
                                    <Logo path={asso.image} alt={asso.id} className={"h-20 w-20 object-fill"}/>
                                    <div className="flex flex-col">
                                        <div className="flex gap-2 items-center justify-start">
                                            <MapPin className="h-6 w-6 text-pink-300"/>
                                            <p className='text-xs text-pink-300'>{asso.location}</p>
                                        </div>
                                        <p className="text-lg font-bold">{asso.day}</p>
                                    </div>
                                </div>
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
                                <MiniCard key={index}>
                                    <div className="flex justify-between items-center">
                                        <div className="flex items-center gap-5">
                                            <Logo path={log.image} alt={log.username}
                                                  className={"h-12 w-12 object-fill"}/>
                                            <div className="flex flex-col gap-1">
                                                <h2 className="text-lg font-bold">{log.username}</h2>
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

export const AssoDay = () => {

    const data = [
        {
            id: 1,
            title: "L'asso du jour",
            value: "CELEST",
        },
        {
            id: 2,
            title: "Email",
            value: "bde@devinci.fr",
        },
        {
            id: 3,
            title: "Défis complétés par l'asso",
            value: "102",
        },
        {
            id: 4,
            title: "Total de points",
            value: "1020",

        }
    ]
    const challengesData = []
    const accountData = [
        {
            id: 1,
            username: "Nicolas",
            image: reactImage
        },

    ]

    const [email, setEmail] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState(accountData[0].image || null);

    const schema = z.object({
        email: z
            .string()
            .email({ message: "Email invalide" })
            .regex(/(edu\.devinci\.fr|devinci\.fr)$/, {
                message: 'Email doit être de type "edu.devinci.fr" ou "devinci.fr"',
            }),
        description: z.string().min(1, { message: "Description requise" }),
        option: z.string().min(1, { message: "Option requise" }),
        image: z.string().nullable(),
    });

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(schema),
    });

    const onSubmit = (data) => {
        console.log("Form Data:", data);
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64String = reader.result;
                setImage(base64String);
                setValue("image", base64String);
            };
            reader.readAsDataURL(file);
        } else {
            setImage(null);
            setValue("image", null);
        }
    };

    const handleDeleteFile = () => {
        setImage(null);
        setValue("image", null);
    };
    return (
        <>
            <StatsBar data={data}/>
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:grid-rows-1">
                <Card className="lg:col-span-5 gap-10 flex flex-col h-full">
                    <div className="flex items-center justify-between">
                        <h2 className="text-2xl font-bold">Les défis</h2>
                        <Button className={"bg-blue-700"} styleType={"primary"}>Ajouter un défi</Button>
                    </div>
                    <div className="flex flex-col gap-6 overflow-y-scroll lg:h-96 no-scrollbar">
                        {challengesData.length === 0 &&
                            <p className="text-center text-lg">Aucun défi pour l'instant</p>}
                        {challengesData.map((challenge, index) => (
                            <MiniCard className={"bg-blue-950 flex items-center justify-between"}>
                                <div>
                                    <div>
                                        <h2 className="text-lg font-bold">Défi 1</h2>
                                        <p className="text-sm">Description du défi</p>
                                    </div>
                                    <h2 className="font-bold text-2xl text-[#8BA8FA]">
                                        +100
                                    </h2>
                                </div>
                                <div className="flex flex-col lg:flex-row items-center gap-2">
                                    <Button styleType={"secondary"}><SquarePen className="h-6 w-6"/></Button>
                                    <Button styleType={"destructive"}><Trash className="h-6 w-6"/></Button>
                                </div>
                            </MiniCard>
                        ))}
                    </div>
                </Card>
                <div className="lg:col-span-7 flex flex-col gap-6">
                    <Card className=" gap-10 flex flex-col">
                        <h2 className="text-2xl font-bold">Informations</h2>
                        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2" id="formInfos">
                            <div className="flex gap-2 items-start">
                                <div className="flex flex-col gap-2 flex-1">
                                    <Input
                                        errors={errors}
                                        register={register}
                                        name={"email"}
                                        type={"email"}
                                        label={"Email"}
                                        id={"email"}
                                        placeholder={"Email"}
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                    <TextArea
                                        errors={errors}
                                        register={register}
                                        name={"description"}
                                        type={"text"}
                                        label={"Description"}
                                        id={"description"}
                                        placeholder={"Marque la description de l'asso"}
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                    />
                                    <select
                                        {...register("option")}
                                        className="w-full py-2 pl-3 pr-8 mt-2 bg-white border border-gray-300 rounded-md focus:border-blue-900 text-gray-950"
                                    >
                                        <option value="">Sélectionner une option</option>
                                        <option value="1">Pôle</option>
                                        <option value="2">Option 2</option>
                                        <option value="3">Option 3</option>
                                    </select>

                                </div>
                                <div className="flex flex-col gap-2">
                                    {image ? (
                                        <img src={image} alt="Preview" className="h-20 w-20 rounded-lg"/>
                                    ) : (
                                        <div className="h-20 w-20 rounded-lg border-blue-700 border"></div>
                                    )}
                                    <div className="flex gap-2 flex-col">
                                        <input
                                            type="file"
                                            id="logo"
                                            name="logo"
                                            className="hidden"
                                            onChange={handleFileChange}
                                        />
                                        <label
                                            htmlFor="logo"
                                            className="cursor-pointer bg-blue-700 hover:bg-blue-900 text-white py-2 px-10 rounded-md leading-6 font-sm transition-all duration-300"
                                        >
                                            <CloudUpload className="h-6 w-6"/>
                                        </label>
                                        <Button
                                            styleType={"destructive"}
                                            className="w-fit"
                                            onClick={handleDeleteFile}
                                            type="button"
                                        >
                                            <Delete className="h-6 w-6"/>
                                        </Button>
                                    </div>
                                </div>
                            </div>

                            <Button styleType={"primary"} type={"submit"} className="w-fit">
                                Ajouter
                            </Button>
                        </form>
                    </Card>
                    <Card>

                    </Card>
                </div>
            </div>
        </>
    );
};


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
            name: "L'asso du jour",
            content: "Content 2",
        },
        {
            id: 3,
            name: "Les assos",
            content: "Content 3",
        },
        {
            id: 4,
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
                {activeTab === 2 && <><AssoDay/></>}
                {activeTab === 3 && <div>Content 3</div>}
                {activeTab === 4 && <div>Content 4</div>}
            </div>
        </Layout>
    )
}