import reactImage from "../assets/react.svg";
import React, {useState, useEffect} from "react";
import {useNavigate, Link, useParams} from "react-router-dom";
import {z} from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import Compressor from "compressorjs";
import {Card, MiniCard} from "../components/ui/cards.jsx";
import {Button} from "../components/buttons/Buttons.jsx";
import {ArrowLeft, CloudUpload, Delete, SquarePen, Trash, Trash2} from "lucide-react";
import Input from "../components/ui/input.jsx";
import TextArea from "../components/ui/text-area.jsx";
import Logo from "../components/layout/logo.jsx";
import Layout from "../layout.jsx";
import ModalChallenge from "../components/modal-challenge.jsx";
import DatePicker from "../components/ui/date-picker.jsx";
import {StatsBar} from "../components/dashboard/stats-bar.jsx";
import useAssociationStore from '../store/associationStore';

export const Asso = () => {
    const {id} = useParams();
    const associations = useAssociationStore((state) => state.associations);

    const navigate = useNavigate();
    const association = associations.find((asso) => asso.id === parseInt(id));
    const [email, setEmail] = useState(association.email || "");
    const [image, setImage] = useState(association.avatarUrl || "");
    const [name, setName] = useState(association.name || "");
    const [description, setDescription] = useState(association.description || "");
    const [date, setDate] = useState(association.date || "");
    const [challenges, setChallenges] = useState(null);

    if (!association) {
        return <p>Association introuvable</p>;
    }
    const data = [
        {id: 1, title: "L'asso du jour", value: association.name},
        {id: 2, title: "Email", value: "bde@devinci.fr"},
        {id: 3, title: "Place", value: 11},
        {id: 4, title: "Total de points", value: 1020},
    ];

    useEffect(() => {
        const response = fetch(`${import.meta.env.VITE_API_URL}/admin/challenges`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'X-ADMIN-KEY': import.meta.env.VITE_ADMIN_KEY
            }
        });

        response.then((response) => response.json())
            .then((data) => {
                setChallenges(data.response[0].data.filter((challenge) => challenge.clubId === parseInt(id)));
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);


    const schemaInfos = z.object({
        name: z.string().min(1, {message: "Nom requis"}),
        option: z.string().optional(),
        date: z.string().optional(),
    });

    const schemaCredentials = z.object({
        email: z
            .string()
            .email({message: "Email invalide"})
            .regex(/(edu\.devinci\.fr|devinci\.fr)$/, {message: 'Email doit être de type "edu.devinci.fr" ou "devinci.fr"'})
    });

    const {
        register: registerInfos,
        handleSubmit: handleSubmitInfos,
        formState: {errors: errorsInfos},
    } = useForm({
        resolver: zodResolver(schemaInfos),
        defaultValues: {
            name: association.name || "",
            option: association.location || "",
            description: association.description || "",
            date: association.dailyDate ? association.dailyDate.split("T")[0] : "",
            image: association.avatarUrl || "",
        },
    });

    const {
        register: registerCredentials,
        handleSubmit: handleSubmitCredentials,
        formState: {errors: errorsCredentials},
    } = useForm({
        resolver: zodResolver(schemaCredentials),
    });

    const onSubmitInfos = async (data, event) => {
        event.preventDefault();
        const {getAssociations} = useAssociationStore.getState();
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/admin/clubs/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'X-ADMIN-KEY': import.meta.env.VITE_ADMIN_KEY
                },
                body: JSON.stringify({
                    name: data.name,
                    avatarUrl: data?.avatarUrl,
                    dailyDate: data?.date,
                    description: data?.description,
                    location: data?.option,
                })
            });

            if (!response.ok) {
                throw new Error("Erreur lors de la mise à jour de l'association");
            }

            const result = await response.json();
            console.log(result);

            await getAssociations();

        } catch (error) {
            console.error(error);
        }
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

    const handleDeleteChallenge = async (challengeId) => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/admin/challenges/${challengeId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'X-ADMIN-KEY': import.meta.env.VITE_ADMIN_KEY
                },
            });
            if (!response.ok) {
                throw new Error("Erreur lors de la suppression du défi");
            }
            const result = await response.json();
            console.log(result);
            navigate(0);

        } catch (error) {
            console.error(error);
        }
    };

    return (
        <>
            <StatsBar data={data}/>
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:grid-rows-1">
                <Card className="lg:col-span-5 gap-10 flex flex-col max-h-[80vh]">
                    <div className="flex items-center justify-between">
                        <h2 className="text-2xl font-bold">Les défis</h2>
                        <Button className={"bg-blue-700 px-4 py-2 w-fit"} styleType={"primary"}
                                onClick={() => handleEditClick()}>Ajouter
                            un défi
                        </Button>
                    </div>
                    <div className="flex flex-col gap-6 overflow-y-scroll lg:h-full no-scrollbar">
                        {challenges && challenges.length === 0 && (
                            <p className="text-center text-lg">Aucun défi pour l'instant</p>
                        )}

                        {challenges && challenges.map((challenge) => (
                            <MiniCard key={challenge.id} className={"bg-blue-950 flex items-center justify-between"}>
                                <div>
                                    <h2 className="text-lg font-bold">{challenge.name}</h2>
                                    <h2 className="font-bold text-2xl text-[#8BA8FA]">+{challenge.score}</h2>
                                </div>
                                <Button styleType={"destructive"} className={"px-4 py-2 w-fit"}
                                        onClick={() => handleDeleteChallenge(challenge.id)}>
                                    <Trash className="h-6 w-6"/>
                                </Button>
                            </MiniCard>
                        ))}
                    </div>
                </Card>
                <div className="lg:col-span-7 flex flex-col gap-6">
                    <Card className="gap-10 flex flex-col justify-between h-full">
                        <h2 className="text-2xl font-bold">Informations</h2>
                        <form onSubmit={handleSubmitInfos(onSubmitInfos)} className="flex flex-col gap-5">
                            <div className="flex flex-col lg:flex-row gap-2 items-start">
                                <div className="flex flex-col gap-2 flex-1 w-full ">
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
                                    <div>
                                        <DatePicker
                                            errors={errorsInfos}
                                            register={registerInfos}
                                            name={"date"}
                                            type={"date"}
                                            label={"Date"}
                                            id={"date"}
                                            placeholder={"Date"}
                                            value={date}
                                            onChange={(e) => setDate(e.target.value)}
                                        />
                                        <label htmlFor="option">Lieu</label>
                                        <select
                                            {...registerInfos("option")}
                                            className="w-full py-2 pl-3 pr-8 mt-2 bg-white border border-gray-300 rounded-md focus:border-blue-900 text-gray-950"
                                            defaultValue={association.location} // Utilise defaultValue pour la valeur initiale
                                        >
                                            <option value="" disabled>Sélectionne un lieu</option>
                                            <option value="1">Arche</option>
                                            <option value="2">Pôle</option>
                                        </select>
                                    </div>
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
                                                type="button" className="px-4 h-fit py-2 w-full">
                                            <Trash2 className="h-6 w-6"/>
                                        </Button>
                                    </div>
                                </div>
                            </div>

                        </form>
                        <Button styleType={"primary"} type={"submit"} className="px-4 py-2 w-fit h-fit "
                                onClick={handleSubmitInfos(onSubmitInfos)}>
                            Ajouter
                        </Button>
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
                            </div>
                            <Button styleType={"primary"} type={"submit"} className="px-4 py-2 w-fit h-fit">
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
                    clubId={id}
                />
            )}
        </>
    );
};

export default function AssoLayout() {
    return (
        <Layout className="md:max-w-none p-6 md:items-start">
            <header className="flex justify-between w-full mb-6">
                <h1 className="text-3xl font-bold text-white">Dashboard</h1>
                <Logo path={reactImage} alt={"React Image"} className={"h-10 w-10"}/>
            </header>
            <div className="flex gap-6 flex-col w-full">
                <Link to={'/admin/dashboard'}>
                    <Button styleType={'secondary'} className={'flex gap-2 px-4 py-2 w-fit'}>
                        <ArrowLeft className={'h-6 w-6'}/>
                        <span>Retour</span>
                    </Button>
                </Link>
                <Asso/>
            </div>
        </Layout>

    );
}
