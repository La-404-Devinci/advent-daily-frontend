import {zodResolver} from "@hookform/resolvers/zod";
import Compressor from "compressorjs";
import {ArrowLeft, CloudUpload, Delete} from "lucide-react";
import React, {useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import {Link, useNavigate, useParams} from "react-router-dom";
import {z} from "zod";
import reactImage from "../assets/react.svg";
import {Button} from "../components/buttons/Buttons.jsx";
import {StatsBar} from "../components/dashboard/stats-bar.jsx";
import Logo from "../components/layout/logo.jsx";
import {Card, MiniCard} from "../components/ui/cards.jsx";
import Input from "../components/ui/input.jsx";
import TextArea from "../components/ui/text-area.jsx";
import Layout from "../layout.jsx";
import {jwtDecode} from "jwt-decode";

export const User = () => {

    const {uuid} = useParams();

    const token = localStorage.getItem("token");
    const decoded = jwtDecode(token);

    const [email, setEmail] = useState(decoded.email || null);
    const [user, setUser] = useState(null);
    const [quote, setQuote] = useState("");
    const [username, setUsername] = useState("");
    const [image, setImage] = useState(null);
    const [challenges, setChallenges] = useState([]);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_API_URL}/users/${uuid}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'X-ADMIN-KEY': import.meta.env.VITE_ADMIN_KEY,
                    },
                });

                if (!response.ok) throw new Error("Erreur lors de la récupération de l'utilisateur");

                const {response: userData} = await response.json();
                const userInfo = userData[0].data;

                setUser(userInfo);
                setUsername(userInfo.user.username || "");
                setQuote(userInfo.user.quote || "");
                setImage(userInfo.user.avatarUrl || null);
                setChallenges(userInfo.challenges);
            } catch (error) {
                console.error(error.message);
            }
        }
        fetchUser();
    }, [uuid]);

    const logsData = [
        {id: 1, username: "Nicolas", action: "Action de Nicolas", image: reactImage, date: "12/12/2021"},
        {id: 2, username: "Nicolas", action: "Action de Nicolas", image: reactImage, date: "12/12/2021"},
        {id: 3, username: "Nicolas", action: "Action de Nicolas", image: reactImage, date: "12/12/2021"},
    ];

    const navigate = useNavigate();

    const schemaInfos = z.object({
        username: z.string().min(3).max(20),
        quote: z.string().optional(),
    });

    const {
        register: registerInfos,
        handleSubmit: handleSubmitInfos,
        formState: {errors: errorsInfos},
    } = useForm({
        resolver: zodResolver(schemaInfos),
    });

    const onSubmitInfos = async (data, event) => {
        event.preventDefault();
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/admin/users/${uuid}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'X-ADMIN-KEY': import.meta.env.VITE_ADMIN_KEY,
                },
                body: JSON.stringify({
                    username: data?.username,
                    quote: data?.quote,
                }),
            });

            if (!response.ok) {
                throw new Error("Erreur lors de la mise à jour de l'utilisateur");
            }
        } catch (error) {
            console.error("Erreur :", error.message);
        }
    };

    const compress = (data) => {
        return new Promise((resolve, reject) => {
            new Compressor(data, {
                quality: 0.6,
                maxHeight: 512,
                maxWidth: 512,
                height: 512,
                width: 512,
                convertSize: 0,
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
                console.log(compressedImage.length);
                setImage(compressedImage);
                console.log(compressedImage);
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

    return (
        <>
            <StatsBar data={[
                {id: 1, title: "Challenges complétés", value: challenges.length},
                {id: 2, title: "Email", value: email},
            ]}/>

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:grid-rows-1">
                <Card className="lg:col-span-5 gap-10 flex flex-col h-full">
                    <h2 className="text-2xl font-bold">Les défis</h2>
                    <div className="flex flex-col gap-6 overflow-y-scroll lg:h-96 no-scrollbar">
                        {challenges.length === 0 &&
                            <p className="text-center text-lg">Aucun défi pour l'instant</p>}
                        {challenges.map((challenge, index) => (
                            <MiniCard key={index} className={"bg-blue-950 flex items-center justify-between"}>
                                <div>
                                    <h2 className="text-lg font-bold">{challenge.name}</h2>
                                    <div className="flex gap-2 items-center">
                                        <Link to={`/admin/dashboard/asso/${challenge.clubId}`}>
                                            <p className="text-sm text-gray-200 underline">ID
                                                CLUB: {challenge.clubId}</p>
                                        </Link>
                                        |
                                        <p className="text-sm text-gray-200">ID CHALLENGE: {challenge.id}</p>
                                    </div>
                                </div>
                                <h2 className="font-bold text-2xl text-[#8BA8FA]">+{challenge.score}</h2>
                            </MiniCard>
                        ))}
                    </div>
                </Card>

                <Card className="gap-10 flex flex-col lg:col-span-4">
                    <h2 className="text-2xl font-bold">Informations</h2>
                    <form onSubmit={handleSubmitInfos(onSubmitInfos)} className="flex flex-col gap-5">
                        <div className="flex flex-col gap-2 items-start w-full justify-between">
                            <div
                                className="flex  gap-2 items-center justify-between w-full md:w-fit">
                                {image ? (
                                    <img src={image} alt="Preview"
                                         className="h-40 w-40  rounded-lg border-blue-700 border p-2 object-cover aspect-square"/>
                                ) : (
                                    <div
                                        className="h-40 w-40  rounded-lg border-blue-700 border"></div>
                                )}
                                <div className="flex gap-2 flex-col items-center">
                                    <input type="file" id="logo" name="logo" className="hidden"
                                           onChange={handleFileChange}/>

                                    <label htmlFor="logo"
                                           className="cursor-pointer bg-blue-700 hover:bg-blue-900 text-white py-2 px-10 rounded-md leading-6 font-sm transition-all duration-300">
                                        <CloudUpload className="h-6 w-6"/>
                                    </label>
                                    <Button styleType={"secondary"} onClick={handleDeleteFile}
                                            type="button" className="px-10 py-2 w-fit h-fit">
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
                                    name={"quote"}
                                    type={"text"}
                                    label={"Citation"}
                                    id={"quote"}
                                    placeholder={"Citation"}
                                    value={quote}
                                    onChange={(e) => setQuote(e.target.value)}
                                />
                            </div>
                        </div>

                        <Button styleType={"primary"} type={"submit"} className="h-fit px-4 py-2 w-fit"
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
                    <Button styleType={'secondary'} className={'flex gap-2 w-fit px-4 py-2'}>
                        <ArrowLeft className={'h-6 w-6'}/>
                        <span>Retour</span>
                    </Button>
                </Link>
                <User/>
            </div>
        </Layout>

    );
}
