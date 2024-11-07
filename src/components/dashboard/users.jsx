import React, {useState} from "react";
import reactImage from "../../assets/react.svg";
import {Card} from "../ui/cards.jsx";
import {SearchBar} from "./search-bar.jsx";
import Logo from "../layout/logo.jsx";
import {Link} from "react-router-dom";
import {Button} from "../buttons/Buttons.jsx";
import {SquarePen, Trash} from "lucide-react";
import {StatsBar} from './stats-bar.jsx';

export const Users = () => {

    const data = [
        {id: 1, title: "Total d'utilisateurs", value: 3012},
    ];

    const [search, setSearch] = useState("");
    const usersData = [
        {id: 1, name: "CELEST", image: reactImage, username: 'Thomas'}, {
            id: 2,
            name: "CELEST",
            username: "Jean",
            image: reactImage
        }, {
            id: 3,
            name: "CELEST",
            username: "Nicolas",
            image: reactImage
        }, {id: 4, name: "CELEST", image: reactImage, username: "Nicolas"}]

    const filteredData = usersData.filter((user) =>
        user.name.toLowerCase().includes(search.toLowerCase()) || user.username.toLowerCase().includes(search.toLowerCase()));


    return (
        <div>
            <StatsBar data={data} className="w-fit"/>
            <Card className="flex flex-col gap-10 mt-6 ">
                <div className="flex items-start justify-between">
                    <h2 className="text-2xl font-bold">Utilisateurs</h2>
                    <SearchBar search={search} setSearch={setSearch}/>
                </div>
                <div className="flex flex-col gap-3 overflow-y-scroll max-h-96 no-scrollbar">
                    {
                        filteredData.map((user, index) => (
                            <div key={index}
                                 className={`flex justify-between items-center border border-blue-700 bg-blue-950 p-5  rounded-2xl`}>
                                <div className="flex items-center gap-4">
                                    <Logo path={user.image} alt={user.id} className={"h-20 w-20 object-fill"}/>
                                    <h2 className="text-xl font-bold">{user.username}</h2>
                                </div>
                                <div className="flex flex-col">

                                    <div className="flex items-center gap-2">
                                        <Link to={`user/${user.name}`}>
                                            <Button styleType={"secondary"} className="w-fit"><SquarePen
                                                className="w-6 h-6"/></Button>
                                        </Link>
                                        <Button styleType={"destructive"} className="w-fit"><Trash className="w-6 h-6"/></Button>
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                    {filteredData.length === 0 && <p className="text-center text-white ">Aucun utilisateur trouvé</p>}
                </div>
            </Card>
        </div>
    )
}
