import React, { useState } from "react";
import Layout from "../layout";
import { Button } from "../components/buttons/Buttons";
import { useForm } from "react-hook-form";
import Logo from "../components/layout/logo";
import { ChevronsDown, ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const ModalConfirmation = ({
  setIsOpen,
  selectedAssociation,
  associations,
}) => {
  const navigate = useNavigate();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-opacity-50 bg-gray-950">
      <div className="flex flex-col justify-between mx-10 bg-black border border-blue-700 h-fit w-96 rounded-2xl">
        <h2 className="p-4 text-lg font-bold text-left">
          Ce choix est définitif!
        </h2>
        <hr className="border-blue-700" />
        <div className="flex flex-col no-scrollbar">
          <div className="flex flex-col items-center w-full gap-3 p-4">
            <div className="flex items-center justify-start w-full gap-3 p-3 text-sm text-left text-white bg-opacity-50 border border-blue-700 rounded-2xl bg-gray-950">
              <Logo
                path={
                  associations.find((a) => a.id === selectedAssociation)
                    .avatar_url
                }
                alt={
                  associations.find((a) => a.id === selectedAssociation).name
                }
                className="w-10 h-10"
              />

              <p className="text-2xl font-bold">
                {associations.find((a) => a.id === selectedAssociation).name}
              </p>
            </div>
            <ChevronsDown className="w-6 h-6" />
            <div className="flex items-center justify-center w-full h-16 gap-3 p-3 text-2xl font-bold text-center text-white bg-opacity-50 border border-blue-700 rounded-2xl bg-gray-950">
              Emaaaal
            </div>
          </div>
          <hr className="border-blue-700" />
          <div className="flex flex-col gap-4 p-4">
            <Button
              styleType="secondary"
              type="button"
              onClick={() => setIsOpen(false)}
            >
              Je veux réfléchir
            </Button>
            <Button
              styleType="primary"
              type="submit"
              onClick={() => navigate("/calendar")}
            >
              Je suis sûr de mon asso !
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

const ModalSelectAssociation = ({
  setIsOpen,
  setSelectedAssociation,
  associations,
}) => {
  const handleAssociationSelect = (association) => {
    setSelectedAssociation(association.id);
    setIsOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-opacity-50 bg-gray-950">
      <div className="flex flex-col justify-between mx-10 bg-black border border-blue-700 rounded-xl h-96 w-96">
        <h2 className="p-4 text-lg font-bold">Choisis ton association</h2>
        <hr className="border-blue-700" />
        <div className="flex flex-col gap-4 p-4 my-4 overflow-y-auto rounded-xl no-scrollbar">
          {associations.map((association) => (
            <button
              key={association.id}
              type="button"
              className="flex items-center w-full gap-4 p-2 text-left hover:bg-blue-700 rounded-xl"
              onClick={() => handleAssociationSelect(association)} // Call selection handler
            >
              <Logo
                path={association.avatar_url}
                alt={association.name}
                className={"w-10 h-10"}
              />
              {association.name}
            </button>
          ))}
        </div>
        <hr className="border-blue-700" />
        <div className="p-4">
          <Button
            styleType="secondary"
            type="button"
            onClick={() => setIsOpen(false)}
            className="w-full"
          >
            Fermer
          </Button>
        </div>
      </div>
    </div>
  );
};

export default function Selection() {
  const [selectedAssociation, setSelectedAssociation] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalConfirmOpen, setIsModalConfirmOpen] = useState(false);

  const meta = {
    title: "Sélectionnne ton asso",
    description: "Sélectionne ton asso",
  };

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    setIsModalConfirmOpen(true);
  };

  const associations = [
    {
      id: "1",
      name: "Association 1",
      description: "association 1 description",
      avatar_url:
        "https://www.shutterstock.com/image-vector/wireframe-icon-thin-outline-style-260nw-1335621422.jpg",
      daily_date: "2023-04-01",
    },
    {
      id: "2",
      name: "Association 2",
      description: "association 2 description",
      avatar_url:
        "https://www.shutterstock.com/image-vector/wireframe-icon-thin-outline-style-260nw-1335621422.jpg",
      daily_date: "2023-04-01",
    },
    {
      id: "3",
      name: "Association 3",
      description: "association 3 description",
      avatar_url:
        "https://www.shutterstock.com/image-vector/wireframe-icon-thin-outline-style-260nw-1335621422.jpg",
      daily_date: "2023-04-01",
    },
    {
      id: "4",
      name: "Association 4",
      description: "association 4 description",
      avatar_url:
        "https://www.shutterstock.com/image-vector/wireframe-icon-thin-outline-style-260nw-1335621422.jpg",
      daily_date: "2023-04-01",
    },
    {
      id: "5",
      name: "Association 5",
      description: "association 5 description",
      avatar_url:
        "https://www.shutterstock.com/image-vector/wireframe-icon-thin-outline-style-260nw-1335621422.jpg",
      daily_date: "2023-04-01",
    },
    {
      id: "6",
      name: "Association 6",
      description: "association 6 description",
      avatar_url:
        "https://www.shutterstock.com/image-vector/wireframe-icon-thin-outline-style-260nw-1335621422.jpg",
      daily_date: "2023-04-01",
    },
  ];

  const selectionAsso = associations.find((a) => a.id === selectedAssociation);

  return (
    <Layout>
      <div className="flex flex-col justify-between min-h-screen px-12 py-32 text-center w-full">
        <div className="text-center">
          <h1 className="text-4xl font-bold">Dernière étape</h1>
          <p className="mt-4 text-3xl">Choisis ton asso</p>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col w-full gap-4"
        >
          <div className="flex flex-col items-start max-w-full">
            <label htmlFor="association" className="hidden">
              Association
            </label>
            <button
              type="button"
              className="flex items-center justify-between w-full gap-3 p-3 text-sm text-left text-white bg-opacity-50 border border-blue-700 rounded-2xl bg-gray-950"
              onClick={() => setIsModalOpen(true)}
            >
              <div className="flex items-center justify-between w-full gap-3">
                {selectedAssociation ? (
                  <>
                    <div className="flex items-center justify-start w-full gap-3">
                      <Logo
                        path={
                          selectedAssociation
                            ? selectionAsso.avatar_url
                            : "https://www.shutterstock.com/image-vector/wireframe-icon-thin-outline-style-260nw-1335621422.jpg"
                        }
                        alt={
                          selectedAssociation
                            ? selectionAsso.name
                            : "Sélectionner une association"
                        }
                        className="w-10 h-10"
                      />
                      <p> {selectionAsso.name}</p>
                    </div>
                    <ChevronDown className="w-6 h-6" />
                  </>
                ) : (
                  <div className="flex items-center justify-between w-full h-10 gap-2">
                    <p>Sélectionne une association</p>
                    <ChevronDown className="w-6 h-6" />
                  </div>
                )}
              </div>
            </button>
          </div>
          <Button
            styleType="primary"
            type="button"
            onClick={() => setIsModalConfirmOpen(true)}
            className={`${selectedAssociation === "" ? "opacity-50" : ""}`}
            disabled={selectedAssociation === ""}
          >
            Création de mon compte
          </Button>
        </form>

        <div className="flex flex-col items-center justify-center">
          <p>Je n'ai pas d'association</p>
          <Link to="/calendar">
            <p className={"text-blue-700 underline"}>
              Continuer sans association{" "}
            </p>
          </Link>
        </div>

        {isModalOpen && (
          <ModalSelectAssociation
            setIsOpen={setIsModalOpen}
            selectedAssociation={selectedAssociation}
            associations={associations}
            setSelectedAssociation={setSelectedAssociation}
          />
        )}
        {isModalConfirmOpen && (
          <ModalConfirmation
            setIsOpen={setIsModalConfirmOpen}
            selectedAssociation={selectedAssociation}
            associations={associations}
          />
        )}
      </div>
    </Layout>
  );
}
