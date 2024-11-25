import React, {useState, useEffect} from "react";
import reactImage from "../../assets/react.svg";
import {Card} from "../ui/cards.jsx";
import {Button} from "../buttons/Buttons.jsx";
import Logo from "../layout/logo.jsx";
import {Link} from "react-router-dom";
import {SquarePen, Trash} from "lucide-react";
import ModalAsso from "../modal-asso.jsx";
import {StatsBar} from "./stats-bar.jsx";
import {SearchBar} from "./search-bar.jsx";
import useAssociationStore from '../../store/associationStore';


export const Assos = () => {
    const [search, setSearch] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [clubsData, setClubsData] = useState([]);
    const { associations, getAssociations } = useAssociationStore();

    useEffect(() => {
        getAssociations();
    }, [getAssociations]);


    const data = [
        {id: 1, title: "Total d'utilisateurs", value: associations.length},
    ];

    return (
        <>
            <StatsBar data={data} className="w-fit"/>
            <Card className="flex flex-col gap-10">
                <div className="flex items-start justify-between flex-col md:flex-row">

                    <h2 className="text-2xl font-bold">Les assos</h2>
                    <div className="flex gap-2 flex-col md:flex-row w-full md:w-fit">
                        <SearchBar search={search} setSearch={setSearch} className="w-full md:w-fit h-full"/>
                        <Button styleType={"primary"} onClick={() => setIsModalOpen(true
                        )} className="w-full md:w-fit px-4 py-2">Ajouter une
                            asso
                        </Button>
                    </div>
                </div>
                <div className="flex flex-col gap-3 overflow-y-scroll max-h-96 lg:max-h-[60vh] no-scrollbar">
                    {associations.map((asso, index) => (
                        <div key={index}
                             className="flex items-center md:justify-between justify-start p-5 border border-blue-700 bg-blue-950 rounded-2xl flex-col md:flex-row gap-2 md:gap-0">
                            <div className="flex items-center gap-4">
                                <Logo path={asso.avatarUrl} alt={asso.id} className="object-fill w-20 h-20"/>
                                <h2 className="text-xl font-bold uppercase">{asso.name}</h2>
                            </div>
                            <div className="flex flex-col gap-2">
                                <div className="flex items-center gap-2">
                                    <Link to={`asso/${asso.id}`}>
                                        <Button styleType={"secondary"} className="px-4 py-2 w-fit"><SquarePen
                                            className="w-6 h-6"/></Button>
                                    </Link>
                                    <Button styleType={"destructive"} className="px-4 py-2 w-fit"><Trash
                                        className="w-6 h-6"/></Button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </Card>
            {isModalOpen && <ModalAsso isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}/>}
        </>

    );
}