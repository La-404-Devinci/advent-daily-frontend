import React, {useState, useEffect} from "react";
import reactImage from "../../assets/react.svg";
import {Card} from "../ui/cards.jsx";
import {Button} from "../buttons/Buttons.jsx";
import Logo from "../layout/logo.jsx";
import {Link} from "react-router-dom";
import {SquarePen, Trash} from "lucide-react";
import ModalAsso from "../modal-asso.jsx";
import {StatsBar} from "./stats-bar.jsx";
import { SearchBar} from "./search-bar.jsx";

export const Assos = () => {
    const [search, setSearch] = useState("");
    const data = [
        { id: 1, title: "Total d'assos", value: 51 },
    ];


    const [isModalOpen, setIsModalOpen] = useState(false);

    console.log(import.meta.env.VITE_API_URL);
useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/admin/assos`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'X-ADMIN-KEY': import.meta.env.VITE_ADMIN_KEY
        }
    })
    .then((response) => response.json())
    .then((data) => {
        console.log(data);
    })
    .catch((error) => {
        console.error(error);
    });
}, []);

    const assosData = [
        { id: 1, name: "CELEST", image: reactImage },
        { id: 2, name: "BDE", image: reactImage },
        { id: 3, name: "3V", image: reactImage },
        { id: 4, name: "CELEST", image: reactImage }
    ];



    const filteredAssos = assosData
        .filter(asso => asso.name.toLowerCase().includes(search.toLowerCase()))
        .sort((a, b) => a.name.localeCompare(b.name));

    return (
        <div>
            <StatsBar data={data} className="w-fit" />
            <Card className="flex flex-col gap-10 mt-6 ">
                <div className="flex items-start justify-between flex-col md:flex-row">

                    <h2 className="text-2xl font-bold">Les assos</h2>
                    <div className="flex gap-2 flex-col md:flex-row w-full md:w-fit">
                        <SearchBar search={search} setSearch={setSearch} className="w-full md:w-fit"/>
                        <Button styleType={"primary"} onClick={() => setIsModalOpen(true
                        )} className="w-full md:w-fit">Ajouter une
                            asso
                        </Button>
                    </div>
                </div>
                <div className="flex flex-col gap-3 overflow-y-scroll max-h-96 no-scrollbar">
                    {filteredAssos.map((asso, index) => (
                        <div key={index} className="flex items-center md:justify-between justify-start p-5 border border-blue-700 bg-blue-950 rounded-2xl flex-col md:flex-row gap-2 md:gap-0">
                            <div className="flex items-center gap-4">
                                <Logo path={asso.image} alt={asso.id} className="object-fill w-20 h-20" />
                                <h2 className="text-xl font-bold">{asso.name}</h2>
                            </div>
                            <div className="flex flex-col gap-2">
                                <div className="flex items-center gap-2">
                                    <Link to={`asso/${asso.name}`}>
                                        <Button styleType={"secondary"} className="w-fit"><SquarePen className="w-6 h-6" /></Button>
                                    </Link>
                                    <Button styleType={"destructive"} className="w-fit"><Trash className="w-6 h-6" /></Button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </Card>
            {isModalOpen && <ModalAsso isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />}
        </div>
    );
}