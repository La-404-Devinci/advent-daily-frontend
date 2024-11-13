import { useState } from "react";
import avatar from "../assets/celest.png";
import { Button } from "../components/buttons/Buttons";
import Header from "../components/layout/header";
import Menu from "../components/layout/menu";
import UserClassement from "../components/leaderboard/user-classement";
import UserPodium from "../components/leaderboard/user-podium";
import Layout from "../layout";

const users = [
    {
        avatarUrl: avatar,
        username: "Celest",
        quote: "Juste une quote quoi",
        place: 1,
        score: 10000,
    },
    {
        avatarUrl: avatar,
        username: "La 404 Devinci",
        quote: "La meilleure association",
        place: 2,
        score: 9000,
    },
    {
        avatarUrl: avatar,
        username: "LeoStunt",
        quote: "On stunt ou quoi ici",
        place: 3,
        score: 8000,
    },
    {
        avatarUrl: avatar,
        username: "Celest",
        quote: "I'm the best",
        place: 4,
        score: 6000,
    },
    {
        avatarUrl: avatar,
        username: "Celest",
        quote: "I'm the best",
        place: 5,
        score: 5000,
    },
    {
        avatarUrl: avatar,
        username: "Celest",
        quote: "I'm the best",
        place: 6,
        score: 4000,
    },
    {
        avatarUrl: avatar,
        username: "Celest",
        quote: "I'm the best",
        place: 6,
        score: 4000,
    },
    {
        avatarUrl: avatar,
        username: "Celest",
        quote: "I'm the best",
        place: 6,
        score: 4000,
    },
    {
        avatarUrl: avatar,
        username: "Celest",
        quote: "I'm the best",
        place: 6,
        score: 4000,
    },
    {
        avatarUrl: avatar,
        username: "Celest",
        quote: "I'm the best",
        place: 6,
        score: 4000,
    },

] 

const clubs = [
    {
        avatarUrl: avatar,
        username: "Celest",
        quote: "150 members",
        place: 1,
        score: 10000,
    },
    {
        avatarUrl: avatar,
        username: "LeoStunt",
        quote: "150 members",
        place: 2,
        score: 9000,
    },
    {
        avatarUrl: avatar,
        username: "LeoStunt",
        quote: "150 members",
        place: 3,
        score: 9000,
    },
    {
        avatarUrl: avatar,
        username: "LeoStunt",
        quote: "150 members",
        place: 4,
        score: 9000,
    },
    {
        avatarUrl: avatar,
        username: "LeoStunt",
        quote: "150 members",
        place: 5,
        score: 9000,
    },
    {
        avatarUrl: avatar,
        username: "LeoStunt",
        quote: "150 members",
        place: 6,
        score: 9000,
    },
    {
        avatarUrl: avatar,
        username: "LeoStunt",
        quote: "150 members",
        place: 7,
        score: 9000,
    },
    {
        avatarUrl: avatar,
        username: "LeoStunt",
        quote: "150 members",
        place: 8,
        score: 9000,
    },
    {
        avatarUrl: avatar,
        username: "LeoStunt",
        quote: "150 members",
        place: 9,
        score: 9000,
    },
    {
        avatarUrl: avatar,
        username: "LeoStunt",
        quote: "150 members",
        place: 10,
        score: 9000,
    },
]


export default function Leaderboard() {
    const [display, setDisplay] = useState("students");
    const data = display === "students" ? users : clubs;

    return (
        <Layout>
            <Header title="Classement"/>
            <div className="p-6 mb-36 w-full">
                <div className="flex justify-center items-end pt-6">
                    {data.slice(0, 3).map((element, index) => (
                        <UserPodium key={`podium:${index}`} user={element} />
                    ))}
                </div>
                <div className="flex flex-col gap-4 mt-8">
                    {data.slice(3).map((element, index) => (
                        <UserClassement key={`classement:${index}`} user={element} />
                    ))}
                </div>
                <div className="flex p-4 gap-4 justify-center items-center fixed 
                    bottom-20 left-0 right-0 bg-gradient-to-t from-black/100 to-black/0
                    max-w-[30rem] mx-auto"
                >
                    <Button 
                        styleType="primary" 
                        className="flex-grow"
                         disabled={display === "students"} 
                         onClick={() => setDisplay("students")}
                    >
                        Étudiant
                    </Button>
                    <Button 
                        styleType="primary" 
                        className="flex-grow" 
                        disabled={display !== "students"} 
                        onClick={() => setDisplay("clubs")}
                    >
                        Associatif
                    </Button>
                </div>
            </div>
            <Menu/>
        </Layout>
    );
}

