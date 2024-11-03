import Header from "../components/layout/header";
import Menu from "../components/layout/menu";
import UserPodium from "../components/userPodium";
import Layout from "../layout";
import avatar from "../assets/celest.png";

const user = 
    {
        avatarUrl: avatar,
        username: "Celest",
        quote: "I'm the best",
        place: 1,
        score: 10000,
    }


export default function Leaderboard() {
    return (
        <Layout>
            <Header title="Classement"/>
            <div className="flex gap-2 pt-6 w-fit h-auto">
                <UserPodium user={user}/>
                <UserPodium user={user}/>
                <UserPodium user={user}/>
            </div>
            <Menu/>
        </Layout>
    );
}

