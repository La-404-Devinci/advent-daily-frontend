import { MailOpen } from "lucide-react";
import { Link, Navigate, useLocation } from "react-router-dom";
import Layout from "../layout";

export default function ConfirmationEmail() {
    const location = useLocation();
    const { email } = location.state || {};

    if (!email) {
        return <Navigate to="/login" />;
    }

    return (
        <Layout>
            <div className="flex flex-col min-h-screen px-6 py-32 text-center w-full">
                <div>
                    <h1 className="text-5xl font-bold">Un mail t&apos;a été envoyé</h1>
                    <p className="mt-4 text-2xl text-white-300">Regarde tes spams</p>
                </div>
                <form className="flex flex-col justify-center items-center w-full gap-8 py-20">
                    <MailOpen className="h-24 w-24 " />
                    <div className=" flex flex-col items-start w-full">
                        <input
                            type="text"
                            placeholder={email}
                            value={email}
                            disabled
                            className=" w-full py-2 pl-3 pr-8 mt-2 bg-white border border-gray-300 rounded-md focus:border-blue-900 text-gray-950"
                        />
                    </div>
                </form>
                <p className="flex flex-col text-center">
                    J&apos;ai pas un 404ID{" "}
                    <span>
                        <Link to="/login" className="font-medium text-blue-400 underline">
                            Me connecter
                        </Link>
                    </span>
                </p>
            </div>
        </Layout>
    );
}
