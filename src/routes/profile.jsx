import { useState } from "react";
import { Link } from "react-router-dom";
import reactImage from "../assets/react.svg";
import { Button } from "../components/buttons/Buttons";
import Header from "../components/layout/header";
import Menu from "../components/layout/menu";
import MissionCard from "../components/mission-card";
import QRModal from "../components/qr-modal";
import Layout from "../layout";

export default function Profile() {

  const [QRCode, setQRCode] = useState(false);
  
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
                className="border-2 border-gray-800 rounded-lg flex-1 py-3 inline-flex 
                items-center justify-center hover:bg-gray-800 transition-colors"
              >
                Editer mon profil
              </Link>
              <Button 
                styleType="primary" 
                className="flex-1 py-3" 
                onClick={() => setQRCode(prev => !prev)}
              >
                Voir mon QR code
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
                className="flex-1 flex flex-col items-center justify-center h-28 border 
                border-blue-700 rounded-lg bg-[#030712]/80 "
              >
                <p className="text-4xl font-bold" >4e</p>
                <p className="text-lg">Classement</p>
              </div>
              <div 
                className="flex-1 flex flex-col items-center justify-center h-28 border 
                border-blue-700 rounded-lg bg-[#030712]/80"
              >
                <p className="text-4xl font-bold" >1500</p>
                <p className="text-lg">Points</p>
              </div>
            </div>
            <div className="flex-1">
              <Button styleType="primary" className="w-full">
                Voir le classement
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
              <MissionCard  
                mission={{ name: "Visiter le campus de l'arche", finish: false, score: 100  }} 
                logo={true}
              />
              <MissionCard  
                mission={{ name: "Le dire à Nicolas", finish: false, score: 100  }} 
                logo={true}
              />
              <MissionCard  
                mission={{ name: "Faire un salto avant sur une table", finish: false, score: 100  }} 
                logo={true}
              />
            </div>
          </div>
          <div className="w-full">
            <Button styleType="danger" className="w-full">
              Se déconnecter
            </Button>
          </div>
        </div>
        {QRCode && (
          <>
            <QRModal onClose={setQRCode} />
          </>
        )}
      <Menu />
    </Layout>
  )
}