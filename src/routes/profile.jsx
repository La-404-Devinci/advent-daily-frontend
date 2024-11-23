import {Crown, QrCode, Sparkle} from "lucide-react";
import {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import reactImage from "../assets/react.svg";
import {Button} from "../components/buttons/Buttons";
import Header from "../components/layout/header";
import Menu from "../components/layout/menu";
import MissionCard from "../components/mission-card";
import QRModal from "../components/qr-modal";
import Layout from "../layout";
import {cn} from "../libs/functions";


const rankingStyling = [
    {
        "color": "text-[#F3E229]",
        "border": "border-[#F3E229]/75",
        "stars": [
            "top-3 right-7 size-6 text-[#F3E229]",
            "top-7 left-5 size-6 text-[#A1D5EF]",
            "top-10 right-5 size-4 text-[#F37FE3]",
        ]
    },
    {
        "color": "text-gray-500",
        "border": "border-gray-500",
        "stars": [
            "top-3 right-7 size-6 text-gray-300",
            "top-7 left-5 size-6 text-[#A1D5EF]",
            "top-10 right-5 size-4 text-[#F37FE3]",
        ]
    },
    {
        "color": "text-yellow-700",
        "border": "border-yellow-700",
        "stars": [
            "top-3 right-7 size-6 text-yellow-700",
            "top-7 left-5 size-6 text-[#A1D5EF]",
            "top-10 right-5 size-4 text-[#F37FE3]",
        ]
    }
]


const profileData = {
    "name": "Kan-a-Pesh",
    "bio": "Bio de kan a pesh ouais la compet yayaya",
    "avatar": reactImage,
    "rank": 1,
    "score": 1500,
    "historyChallenges": [
        {name: "Visiter le campus de l'arche", finish: false, score: 100},
        {name: "Le dire à Nicolas", finish: false, score: 100},
        {name: "Faire un salto avant sur une table", finish: false, score: 100},
    ]
}

export default function Profile() {
    const [QRCode, setQRCode] = useState(false);
    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem("authToken");
        navigate("/login");
    };

    return (
        <Layout>
            <Header title="Mon profil"/>
            <div className="mt-16 mb-20 w-full max-w-[30rem] mx-auto p-6 flex flex-col gap-12">
                <div className="w-full flex flex-col gap-4">
                    <div className="flex items-center gap-4">
                        <div className="rounded-xl w-24 h-24 overflow-hidden bg-gray-800 flex-shrink-0">
                            <img
                                src={profileData.avatar}
                                alt="Avatar"
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div className="flex flex-col gap-1">
                            <h2 className="text-2xl font-bold text-gray-50">
                                {profileData.name}
                            </h2>
                            <p className="text-gray-300 leading-tight">
                                {profileData.bio}
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center w-full gap-2">
                        <Link
                            to="/me/edit"
                            className="bg-gray-800 rounded-lg flex-1 h-12 inline-flex
                items-center justify-center hover:bg-gray-700 transition-colors"
                        >
                            Éditer le profil
                        </Link>
                        <Button
                            styleType="primary"
                            className="flex-1"
                            onClick={() => setQRCode(prev => !prev)}
                        >
                            <QrCode className="w-6 h-6 mr-2"/>
                            <span>QR code</span>
                        </Button>
                    </div>
                </div>
                <div className="flex flex-col gap-4">
                    <div>
                        <h3 className="text-3xl font-medium text-gray-50">
                            Mon classement
                        </h3>
                    </div>
                    <div className="w-full flex items-center gap-3">
                        <div
                            className={cn(
                                `relative flex-1 flex flex-col items-center justify-center h-28 border 
                 rounded-xl bg-[#030712]/80 border-blue-900`,
                                profileData.rank < 4 && rankingStyling[profileData.rank - 1].border
                            )}
                        >
                            <p className={cn(
                                `text-4xl font-bold`,
                                profileData.rank < 4 && rankingStyling[profileData.rank - 1].color
                            )}>
                                {profileData.rank === 1 ? `${profileData.rank}er` : `${profileData.rank}e`}
                            </p>
                            <p className="text-lg">Classement</p>
                            {profileData.rank < 4 && (
                                [0, 1, 2].map((star) => (
                                        <Sparkle
                                            key={`stars:${star}`}
                                            className={cn(
                                                `absolute top-3 right-7 size-6`,
                                                rankingStyling[profileData.rank - 1].stars[star]
                                            )}
                                        />
                                    )
                                ))}
                        </div>
                        <div
                            className="flex-1 flex flex-col items-center justify-center h-28 border
                border-blue-900 rounded-xl bg-[#030712]/80"
                        >
                            <p className="text-4xl font-bold normal-nums">{profileData.score}</p>
                            <p className="text-lg">Points</p>
                        </div>
                    </div>
                    <div className="flex-1">
                        <Link
                            to="/leaderboard"
                            className="w-full flex items-center justify-center h-12 bg-blue-700 hover:bg-blue-900
                transition-colors duration-200 rounded-md"
                        >
                            <Crown className="w-6 h-6 mr-2"/>
                            <span>Voir le classement</span>
                        </Link>
                    </div>
                </div>
                <div className="flex flex-col gap-4">
                    <div>
                        <h3 className="text-3xl font-medium text-gray-50">
                            Historique des défis
                        </h3>
                    </div>
                    <div className="w-full flex flex-col items-center gap-3">
                        <ul className="flex flex-col gap-2 w-full">
                            {profileData.historyChallenges.map((challenge, index) => (
                                <li key={index}>
                                    <MissionCard mission={challenge} logo={true}/>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
                <div className="w-full mt-8">
                    <Button styleType="destructive" className="w-full" onClick={handleLogout}>
                        Se déconnecter
                    </Button>
                </div>
            </div>
            {QRCode && (
                <QRModal onClose={setQRCode}/>
            )}
            <Menu/>
        </Layout>
    )
}