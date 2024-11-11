import React, {useEffect, useState} from "react";
import Layout from '../layout';
import Logo from "../components/layout/logo.jsx";
import reactImage from "../assets/react.svg";
import { Assos } from "../components/dashboard/assos.jsx";
import { Users } from "../components/dashboard/users.jsx";
import { ModalAccount } from "../components/dashboard/modal-account.jsx";
import { General } from "../components/dashboard/general.jsx";


export const Tabs = ({className, activeTab, setActiveTab}) => {
    const handleTab = (id) => {
        return () => {
            setActiveTab(id);
            const object = {value: id, timestamp: Date.now()};
            localStorage.setItem('activeTab', JSON.stringify(object));
        }
    }

    const tabs = [
        {
            id: 1,
            name: "Général",
            content: "Content 1",
        },
        {
            id: 2,
            name: "Les assos",
            content: "Content 3",
        },
        {
            id: 3,
            name: "Les utilisateurs",
            content: "Content 4",
        },
    ]

    return (
        <ul className={`flex bg-[#030712] rounded-md border border-blue-700 p-1.5 ${className}`}>
            {tabs.map((tab) => (
                <li key={tab.id} onClick={handleTab(tab.id)}>
                    <button
                        className={`font-medium py-1.5 px-3 rounded-lg h-full text-left ${tab.id === activeTab ? "bg-blue-700" : ""}`}>
                        {tab.name}
                    </button>
                </li>
            ))}
        </ul>
    )
}

export default function Dashboard404() {

    const [activeTab, setActiveTab] = useState(1);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const savedTab = JSON.parse(localStorage.getItem('activeTab'));
        if (savedTab) {
            const now = Date.now();
            if (now - savedTab.timestamp < 300000) { // 5 minutes
                setActiveTab(savedTab.value);
            } else {
                localStorage.removeItem('activeTab');
            }
        }
    }, []);

    return (
        <Layout className="p-6 md:max-w-none md:items-start">
            {isModalOpen && <ModalAccount isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />}
            <header className="relative flex justify-between w-full">
                <h1 className="text-3xl font-bold text-white">Dashboard</h1>
                <div className="relative" onClick={() => setIsModalOpen(true)}>
                    <Logo path={reactImage} alt={"React Image"} className={"h-10 w-10"}/>
                </div>
            </header>
            <div className="flex w-full">
                <Tabs className="my-6" activeTab={activeTab} setActiveTab={setActiveTab}/>
            </div>

            <div className="flex flex-col w-full gap-6">
                {activeTab === 1 &&
                    <>
                        <General/>
                    </>
                }
                {activeTab === 2 && <><Assos/></>}
                {activeTab === 3 && <><Users/></>}
            </div>
        </Layout>
    )
}