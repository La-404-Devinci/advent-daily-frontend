import React, {useEffect, useState} from "react";
import reactImage from "../../assets/react.svg";
import {Card} from "../ui/cards.jsx";
import {SearchBar} from "./search-bar.jsx";
import Logo from "../layout/logo.jsx";
import {Link} from "react-router-dom";
import {Button} from "../buttons/Buttons.jsx";
import {SquarePen} from "lucide-react";
import {StatsBar} from './stats-bar.jsx';
import useUsersStore from '../../store/usersStore';
import Image from "../image.jsx";
import NoImage from "../../assets/no-image-found.png";


export const Users = () => {

    const [search, setSearch] = useState("");
    const {users, getUsers} = useUsersStore();

    useEffect(() => {
        getUsers();
    }, [getUsers]);

    const filteredData = users.filter((user) => {
        return user.username.toLowerCase().includes(search.toLowerCase());
    });

    return (
        <>
            <StatsBar data={[
                {id: 1, title: "Total d'utilisateurs", value: users.length},
            ]} className="w-fit"/>
            <Card className="flex flex-col gap-10 mt-6 ">
                <div className="flex items-start justify-between flex-col md:flex-row">
                    <h2 className="text-2xl font-bold">Utilisateurs</h2>
                    <SearchBar search={search} setSearch={setSearch} className="w-full md:w-fit"/>
                </div>
                <div className="flex flex-col gap-3 overflow-y-scroll max-h-96 no-scrollbar">
                    {
                        filteredData.map((user, index) => (
                            <div key={index}
                                 className={`flex justify-start md:justify-between items-center border border-blue-700 bg-blue-950 p-5 rounded-2xl flex-col md:flex-row gap-2 md:gap-0`}>
                                <div className="flex items-center gap-4">
                                    {user.avatarUrl && (
                                        <Image
                                            blobUrl={user.avatarUrl}
                                            fallback={NoImage}
                                            className="w-20 object-contain rounde"
                                        />
                                    )}
                                    <h2 className="text-xl font-bold">{user.username}</h2>
                                </div>
                                <div className="flex flex-col">
                                    <div className="flex items-center gap-2 flex-col md:flex-row">
                                        <Link to={`user/${user.uuid}`}>
                                            <Button styleType={"secondary"} className="px-4 py-2 w-fit"><SquarePen
                                                className="w-6 h-6"/></Button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                    {
                        filteredData.length === 0 && <p className="text-center text-white ">Aucun utilisateur trouvé</p>
                    }
                </div>
            </Card>
            )
        </>
    );
}
