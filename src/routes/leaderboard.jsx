import Header from "../components/layout/header";
import Menu from "../components/layout/menu";
import UserPodium from "../components/userPodium";
import Layout from "../layout";
import avatar from "../assets/celest.png";

const users = [
    {
        avatarUrl: avatar,
        username: "Celest",
        quote: "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
        place: 1,
        score: 10000,
    },
    {
        avatarUrl: avatar,
        username: "Celest",
        quote: "I'm the best",
        place: 2,
        score: 9000,
    },
    {
        avatarUrl: avatar,
        username: "Celest",
        quote: "I'm the best",
        place: 3,
        score: 8000,
    },

] 


export default function Leaderboard() {
    return (
        <Layout>
            <Header title="Classement"/>
            <div className="flex items-end gap-2 pt-6 w-fit h-auto">
                {users.map((user, index) => (
                    <UserPodium key={`podium:${index}`} user={user} />
                ))}
            </div>
            <Menu/>
        </Layout>
    );
}

