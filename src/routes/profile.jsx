import { Crown, QrCode, Sparkle } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import reactImage from "../assets/react.svg";
import { Button } from "../components/buttons/Buttons";
import Header from "../components/layout/header";
import Menu from "../components/layout/menu";
import MissionCard from "../components/mission-card";
import QRModal from "../components/qr-modal";
import Layout from "../layout";
import { cn } from "../libs/functions";

const rankingInformations = [
  {
    "format": "1er",
    "color": "text-[#F3E229]",
  },
  {
    "format": "2eme",
    "color": "text-gray-500",
  },
  {
    "format": "3eme",
    "color": "text-yellow-900",
  }
]

export default function Profile() {

  const [QRCode, setQRCode] = useState(false);

  const historyChallenges = [
    { name: "Visiter le campus de l'arche", finish: false, score: 100  },
    { name: "Le dire à Nicolas", finish: false, score: 100  },
    { name: "Faire un salto avant sur une table", finish: false, score: 100  },
  ];

  const rank = 1;
  
  return  (
    <Layout>
      <Header title="Mon profil"/>
        <div className="mt-16 mb-20 w-full max-w-[30rem] mx-auto p-6 flex flex-col gap-8">
          <div className="w-full flex flex-col gap-4">
            <div className="flex items-center gap-4">
              <div className="rounded-xl w-24 h-24 overflow-hidden bg-gray-800 flex-shrink-0">
                <img 
                  src={reactImage} 
                  alt="Avatar" 
                  className="w-full h-full object-cover" 
                />
              </div>
              <div className="flex flex-col gap-1">
                <h2 className="text-2xl font-semibold text-gray-50">
                  Kan-a-Pesh
                </h2>
                <p className="text-gray-300 leading-tight">
                  Bio de kan a pesh ouais la compet yayaya
                </p>
              </div>
            </div>
            <div className="flex items-center w-full gap-2">
              <Link 
                to="/me/edit" 
                className="border border-gray-800 rounded-lg flex-1 h-12 inline-flex 
                items-center justify-center hover:bg-gray-800 transition-colors"
              >
                Editer mon profil
              </Link>
              <Button 
                styleType="primary" 
                className="flex-1 py-3" 
                onClick={() => setQRCode(prev => !prev)}
              >
                <QrCode className="w-6 h-6 mr-2" />
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
                className="relative flex-1 flex flex-col items-center justify-center h-28 border 
                border-blue-700 rounded-xl bg-[#030712]/80 "
              >
                <p className={cn(
                  `text-4xl font-bold`,
                  rank < 4 && rankingInformations[rank - 1].color
                )}>
                  1er
                </p>
                <p className="text-lg">Classement</p>
                {rank < 4 && (
                  <>
                    <Sparkle className="absolute top-3 right-7 size-6  text-[#F3E229]" />
                    <Sparkle className="absolute top-7 left-5 size-6 text-[#A1D5EF]" />
                    <Sparkle className="absolute top-10 right-5 size-4 text-[#F37FE3]" />
                  </>
                )}
              </div>
              <div 
                className="flex-1 flex flex-col items-center justify-center h-28 border 
                border-blue-700 rounded-xl bg-[#030712]/80"
              >
                <p className="text-4xl font-bold normal-nums">1500</p>
                <p className="text-lg">Points</p>
              </div>
            </div>
            <div className="flex-1">
              <Button styleType="primary" className="w-full">
                <Crown className="w-6 h-6 mr-2" />
                <span>Voir le classement</span>
              </Button>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <div>
              <h3 className="text-3xl font-medium text-gray-50">
                Historique des défis
              </h3>
            </div>
            <div className="w-full flex flex-col items-center gap-3">
              {/* 24 / 16 / 32 */}
              <ul className="flex flex-col gap-2 w-full">
                {historyChallenges.map((challenge, index) => (
                  <li key={index} >
                    <MissionCard mission={challenge} logo={true} />
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="w-full">
            <Button styleType="destructive" className="w-full">
              Se déconnecter
            </Button>
          </div>
        </div>
        {QRCode && (
          <QRModal onClose={setQRCode} />
        )}
      <Menu />
    </Layout>
  )
}