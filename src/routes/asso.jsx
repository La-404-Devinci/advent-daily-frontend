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


export const Asso = () => {

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
        {id: 1, username: "Nicolas", image: reactImage, email: "bde@devinci.fr", password: "12345678"},
    ];

    const [email, setEmail] = useState(accountData[0].email || "");
    const [description, setDescription] = useState(accountData[0].description || "");
    const [name, setName] = useState(accountData[0].username || "");
    const [image, setImage] = useState(accountData[0].image || null);
    const [password, setPassword] = useState(accountData[0].password || "");


    const navigate = useNavigate();

    const schemaInfos = z.object({
        name: z.string().min(1, {message: "Nom requis"}),
        option: z.string().min(1, {message: "Option requise"}),
        description: z.string().min(1, {message: "Description requise"}),
    });

    const schemaCredentials = z.object({
        email: z
            .string()
            .email({message: "Email invalide"})
            .regex(/(edu\.devinci\.fr|devinci\.fr)$/, {message: 'Email doit être de type "edu.devinci.fr" ou "devinci.fr"'}),
        password: z.string().min(8, {message: "Mot de passe requis"}),
    });

    const {
        register: registerInfos,
        handleSubmit: handleSubmitInfos,
        formState: {errors: errorsInfos},
    } = useForm({
        resolver: zodResolver(schemaInfos),
    });

    const {
        register: registerCredentials,
        handleSubmit: handleSubmitCredentials,
        formState: {errors: errorsCredentials},
    } = useForm({
        resolver: zodResolver(schemaCredentials),
    });

    const onSubmitInfos = (data, event) => {
        event.preventDefault();

        console.log("Form Infos Data:", data);
    };

    const onSubmitCredentials = (data) => {
        console.log("Form Credentials Data:", data);
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
                setIsLogoDirty(true);
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
                    <div className="flex items-center justify-between">
                        <h2 className="text-2xl font-bold">Les défis</h2>
                        <Button className={"bg-blue-700"} styleType={"primary"} onClick={() =>handleEditClick() } >Ajouter un défi</Button>
                    </div>
                    <div className="flex flex-col gap-6 overflow-y-scroll lg:h-96 no-scrollbar">
                        {challengesData.length === 0 &&
                            <p className="text-center text-lg">Aucun défi pour l'instant</p>}
                        {challengesData.map((challenge, index) => (
                            <MiniCard key={index} className={"bg-blue-950 flex items-center justify-between"}>
                                <div>
                                    <h2 className="text-lg font-bold">{challenge.title}</h2>
                                    <p className="text-sm">{challenge.description}</p>
                                    <h2 className="font-bold text-2xl text-[#8BA8FA]">+{challenge.score}</h2>
                                </div>
                                <div className="flex flex-col lg:flex-row items-center gap-2">
                                    <Button styleType={"secondary"}
                                            onClick={(e) => handleEditClick(challenge)}><SquarePen
                                        className="h-6 w-6"/></Button>
                                    <Button styleType={"destructive"}><Trash className="h-6 w-6"/></Button>
                                </div>
                            </MiniCard>
                        ))}
                    </div>
                </Card>
                <div className="lg:col-span-7 flex flex-col gap-6">
                    <Card className="gap-10 flex flex-col">
                        <h2 className="text-2xl font-bold">Informations</h2>
                        <form onSubmit={handleSubmitInfos(onSubmitInfos)} className="flex flex-col gap-5">
                            <div className="flex flex-col lg:flex-row gap-2 items-start">
                                <div className="flex flex-col gap-2 flex-1 w-full">
                                    <Input
                                        errors={errorsInfos}
                                        register={registerInfos}
                                        name={"name"}
                                        type={"text"}
                                        label={"Name"}
                                        id={"name"}
                                        placeholder={"Nom de l'asso"}
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                    <TextArea
                                        errors={errorsInfos}
                                        register={registerInfos}
                                        name={"description"}
                                        type={"text"}
                                        label={"Description"}
                                        id={"description"}
                                        placeholder={"Marque la description de l'asso"}
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                    />
                                    <select
                                        {...registerInfos("option")}
                                        className="w-full py-2 pl-3 pr-8 mt-2 bg-white border border-gray-300 rounded-md focus:border-blue-900 text-gray-950"
                                    >
                                        <option value="">Sélectionne un lieu</option>
                                        <option value="1">Pôle</option>
                                        <option value="2">Arche</option>
                                    </select>
                                </div>
                                <div className="flex flex-col gap-2 p-3 items-center w-full md:w-fit">
                                    {image ? (
                                        <img src={image} alt="Preview"
                                             className="h-40 w-40 lg:h-20 lg:w-20 rounded-lg border-blue-700 border p-2 object-cover aspect-square"/>
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
                            </div>
                            <Button styleType={"primary"} type={"submit"} className="w-fit h-fit"
                                    onClick={handleSubmitInfos(onSubmitInfos)}>
                                Ajouter
                            </Button>
                        </form>
                    </Card>
                    <Card>
                        <form onSubmit={handleSubmitCredentials(onSubmitCredentials)}
                              className={"flex flex-col lg:flex-row justify-between lg:items-end gap-5"}
                              id="credentialsAccount">
                            <div className="flex flex-col lg:flex-row gap-2 w-full">
                                <Input
                                    errors={errorsCredentials}
                                    register={registerCredentials}
                                    name={"email"}
                                    type={"email"}
                                    label={"Email"}
                                    id={"email"}
                                    placeholder={"Email de l'asso"}
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                <Input
                                    errors={errorsCredentials}
                                    register={registerCredentials}
                                    name={"password"}
                                    type={"password"}
                                    label={"Password"}
                                    id={"password"}
                                    placeholder={"Mot de passe de l'asso"}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                            <Button styleType={"primary"} type={"submit"} className="w-fit h-fit">
                                Ajouter
                            </Button>
                        </form>
                    </Card>
                </div>
            </div>
            {isModalOpen && (
                <ModalChallenge
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    challenge={selectedChallenge}
                />
            )}
        </>
    );
};

export default function AssoLayout () {
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

                <Asso/>
            </div>
        </Layout>

    );
}
