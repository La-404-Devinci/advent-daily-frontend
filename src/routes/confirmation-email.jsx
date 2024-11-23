import Layout from "../layout";
import {MailOpen} from "lucide-react";

export default function ConfirmationEmail() {
    const email = localStorage.getItem("email") ?? "test@edu.devinci.fr";

    return (
        <Layout>
            <div className="flex flex-col min-h-screen px-6 py-32 text-center w-full">
                <div>
                    <h1 className="text-5xl font-bold">Un mail t'as été envoyé</h1>
                    <p className="mt-4 text-2xl text-white-300">Regarde tes spams</p>
                </div>
                <form className="flex flex-col justify-center items-center w-full gap-8 py-24">
                    <MailOpen className="h-24 w-24 "/>
                    <div className=" flex flex-col items-start w-full">
                        <input type="text" placeholder={email} value={email} disabled
                               className=" w-full py-2 pl-3 pr-8 mt-2 bg-white border border-gray-300 rounded-md focus:border-blue-900 text-gray-950"/>
                    </div>
                </form>
            </div>
        </Layout>
    );
}