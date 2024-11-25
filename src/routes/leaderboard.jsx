import { useEffect, useMemo, useState } from "react";
import { Button } from "../components/buttons/Buttons";
import Header from "../components/layout/header";
import Menu from "../components/layout/menu";
import UserClassement from "../components/leaderboard/user-classement";
import useLeaderboardStore from "../store/leaderboardStore";
import UserPodium from "../components/leaderboard/user-podium";
import Layout from "../layout";

export default function Leaderboard() {
    const [display, setDisplay] = useState("students");
    const { userLeaderboard, clubsLeaderboard, fetchLeaderboards } = useLeaderboardStore();

    useEffect(() => {
        fetchLeaderboards();
    }, [fetchLeaderboards]);

    const users = useMemo(() => userLeaderboard.sort((a, b) => b.score - a.score), [userLeaderboard]);
    const clubs = useMemo(() => clubsLeaderboard.sort((a, b) => b.score - a.score), [clubsLeaderboard]);

    const data = useMemo(() => {
        if (display === "students") {
            return users.map((user) => ({
                avatarUrl: user.user.avatarUrl,
                username: user.user.username,
                quote: user.user.quote,
                score: user.score,
            }));
        } else {
            return clubs.map((club) => ({
                avatarUrl: club.club.avatarUrl,
                username: club.club.name,
                quote: null,
                score: club.score,
            }));
        }
    }, [display, users, clubs]);

    if (!data) return null;

    return (
        <Layout>
            <Header title="Classement" />
            <div className="p-6 mb-36 w-full">
                <div className="flex justify-center items-end pt-6">
                    {data.slice(0, 3).map((element, index) => (
                        <UserPodium key={`podium:${index}`} user={element} place={index} />
                    ))}
                </div>
                <div className="flex flex-col gap-4 mt-8">
                    {data.slice(3).map((element, index) => (
                        <UserClassement key={`classement:${index}`} user={element} place={index + 4} />
                    ))}
                </div>
                <div
                    className="flex p-4 gap-4 justify-center items-center fixed 
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
                    <Button styleType="primary" className="flex-grow" disabled={display !== "students"} onClick={() => setDisplay("clubs")}>
                        Associatif
                    </Button>
                </div>
            </div>
            <Menu />
        </Layout>
    );
}
