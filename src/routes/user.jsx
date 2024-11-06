import reactImage from "../assets/react.svg";
import React, {useState} from "react";
import {useNavigate, Link} from "react-router-dom";
import {z} from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import Compressor from "compressorjs";
import {Card, MiniCard} from "../components/ui/cards.jsx";
import {Button} from "../components/buttons/Buttons.jsx";
import {ArrowLeft, CloudUpload, Delete, SquarePen, Trash} from "lucide-react";
import Input from "../components/ui/input.jsx";
import TextArea from "../components/ui/text-area.jsx";
import {Assos, GeneralTab, StatsBar, Tabs, Users} from "./dashboard-404.jsx";
import Logo from "../components/layout/logo.jsx";
import Layout from "../layout.jsx";
import ModalChallenge from "../components/modal-challenge.jsx";


export const User = () => {

    const data = [
        {id: 1, title: "L'asso du jour", value: "CELEST"},
        {id: 2, title: "Email", value: "bde@devinci.fr"},
        {id: 3, title: "Défis complétés par l'asso", value: "102"},
        {id: 4, title: "Total de points", value: "1020"},
    ];

    const challengesData = [
        {id: 1, title: "Défi 1", description: "Description du défi", score: 100},
        {id: 2, title: "Défi 2", description: "Description du défi", score: 100},
        {id: 3, title: "Défi 3", description: "Description du défi", score: 100},
    ];
    const accountData = [
        {id: 1, username: "Nicolas", image: reactImage, citation: "Citation de Nicolas"},
    ];

    const logsData = [
        {id: 1, username: "Nicolas", action: "Action de Nicolas", image: reactImage, date: "12/12/2021"},
        {id: 2, username: "Nicolas", action: "Action de Nicolas", image: reactImage, date: "12/12/2021"},
        {id: 3, username: "Nicolas", action: "Action de Nicolas", image: reactImage, date: "12/12/2021"},
    ];

    const [citation, setCitation] = useState(accountData[0].citation || "");
    const [username, setUsername] = useState(accountData[0].username || "");
    const [image, setImage] = useState(accountData[0].image || null);


    const navigate = useNavigate();

    const schemaInfos = z.object({
        username: z.string().min(1, {message: "Nom requis"}),
        citation: z.string().min(1, {message: "Citation requise"}),
    });


    const {
        register: registerInfos,
        handleSubmit: handleSubmitInfos,
        formState: {errors: errorsInfos},
    } = useForm({
        resolver: zodResolver(schemaInfos),
    });


    const onSubmitInfos = (data, event) => {
        event.preventDefault();

        console.log("Form Infos Data:", data);
    };

    const compress = (data) => {
        return new Promise((resolve, reject) => {
            new Compressor(data, {
                quality: 0.6,
                maxHeight: 512,
                maxWidth: 512,
                height: 512,
                width: 512,
                convertSize: 0, // Always compress
                resize: "cover",
                convertTypes: "image/jpeg",
                success(result) {
                    const reader = new FileReader();
                    reader.readAsDataURL(result);
                    reader.onloadend = () => {
                        resolve(reader.result);
                    };
                    reader.onerror = (err) => {
                        reject(err);
                    };
                },
                error(err) {
                    reject(err);
                }
            });
        });
    };

    const handleFileChange = async (event) => {
        const file = event.target.files[0];
        if (file) {
            try {
                const compressedImage = await compress(file);
                setImage(compressedImage);
            } catch (error) {
                console.error("Error compressing the image:", error);
            }
        } else {
            setImage(null);
        }
    };


    const handleDeleteFile = () => {
        setImage(null);


    };
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedChallenge, setSelectedChallenge] = useState(null);

    const handleEditClick = (challenge) => {
        setSelectedChallenge(challenge);
        setIsModalOpen(true);
    };

    return (
        <>
            <StatsBar data={data}/>

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:grid-rows-1">
                <Card className="lg:col-span-5 gap-10 flex flex-col h-full">
                    <h2 className="text-2xl font-bold">Les défis</h2>
                    <div className="flex flex-col gap-6 overflow-y-scroll lg:h-96 no-scrollbar">
                        {challengesData.length === 0 &&
                            <p className="text-center text-lg">Aucun défi pour l'instant</p>}
                        {challengesData.map((challenge, index) => (
                            <MiniCard key={index} className={"bg-blue-950 flex items-center justify-between"}>
                                <div>
                                    <h2 className="text-lg font-bold">{challenge.title}</h2>
                                    <p className="text-sm">{challenge.description}</p>

                                </div>
                                <h2 className="font-bold text-2xl text-[#8BA8FA]">+{challenge.score}</h2>
                            </MiniCard>
                        ))}
                    </div>
                </Card>

                <Card className="gap-10 flex flex-col lg:col-span-4">
                    <h2 className="text-2xl font-bold">Informations</h2>
                    <form onSubmit={handleSubmitInfos(onSubmitInfos)} className="flex flex-col gap-5">
                        <div className="flex flex-col gap-2 items-start">
                            <div
                                className="flex flex-col lg:flex-row gap-2 p-3 items-center justify-between w-full md:w-fit">
                                {image ? (
                                    <img src={image} alt="Preview"
                                         className="h-40 w-40  rounded-lg border-blue-700 border p-2 object-cover aspect-square"/>
                                ) : (
                                    <div
                                        className="h-40 w-40 lg:h-20 lg:w-20 rounded-lg border-blue-700 border"></div>
                                )}
                                <div className="flex gap-2 flex-col items-center">
                                    <input type="file" id="logo" name="logo" className="hidden"
                                           onChange={handleFileChange}/>
                                    <label htmlFor="logo"
                                           className="cursor-pointer bg-blue-700 hover:bg-blue-900 text-white py-2 px-10 rounded-md leading-6 font-sm transition-all duration-300">
                                        <CloudUpload className="h-6 w-6"/>
                                    </label>
                                    <Button styleType={"secondary"} onClick={handleDeleteFile}
                                            type="button">
                                        <Delete className="h-6 w-6"/>
                                    </Button>
                                </div>
                            </div>
                            <div className="flex flex-col gap-2 flex-1 w-full">
                                <Input
                                    errors={errorsInfos}
                                    register={registerInfos}
                                    name={"username"}
                                    type={"text"}
                                    label={"Nom d'utilisateur"}
                                    id={"username"}
                                    placeholder={"Nom d'utilisateur"}
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                />
                                <TextArea
                                    errors={errorsInfos}
                                    register={registerInfos}
                                    name={"citation"}
                                    type={"text"}
                                    label={"Citation"}
                                    id={"citation"}
                                    placeholder={"Citation"}
                                    value={citation}
                                    onChange={(e) => setCitation(e.target.value)}
                                />

                            </div>

                        </div>
                        <Button styleType={"primary"} type={"submit"} className="w-fit h-fit"
                                onClick={handleSubmitInfos(onSubmitInfos)}>
                            Ajouter
                        </Button>
                    </form>
                </Card>
                <Card className="gap-10 flex flex-col lg:col-span-3">
                    <h2 className="text-2xl font-bold">Logs</h2>
                    <ul className="flex flex-col gap-5 overflow-y-scroll lg:h-96 no-scrollbar">
                        {logsData.map((log, index) => (
                            <li key={index} className="flex gap-2 items-center">
                                <MiniCard className="bg-blue-950 ">
                                    <p>{log.date}</p>
                                    <p className="text-sm">{log.action}</p>
                                </MiniCard>
                            </li>
                        ))}
                    </ul>
                </Card>
            </div>
        </>
    );
};

export default function UserLayout() {
    return (
        <Layout className="md:max-w-none p-6 md:items-start">
            <header className="flex justify-between w-full mb-6">
                <h1 className="text-3xl font-bold text-white">Dashboard</h1>
                <Logo path={reactImage} alt={"React Image"} className={"h-10 w-10"}/>
            </header>
            <div className="flex gap-6 flex-col w-full">
                <Link to={'/admin/dashboard'}>
                    <Button styleType={'secondary'} className={'flex gap-2 w-fit'}>
                        <ArrowLeft className={'h-6 w-6'}/>
                        <span>Retour</span>
                    </Button>
                </Link>

                <User/>
            </div>
        </Layout>

    );
}
