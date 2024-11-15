import { Button } from "../buttons/Buttons";
import Logo from "../layout/logo";

const SelectAssociationModal = ({
    setIsOpen,
    setSelectedAssociation,
    associations,
  }) => {

    const handleAssociationSelect = (association) => {
      setSelectedAssociation(association);
      setIsOpen(false);
    };
  
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-opacity-50 bg-gray-950">
        <div className="flex flex-col justify-between bg-gray-950 border border-blue-950 rounded-xl
         h-96 w-11/12 max-w-[30rem]">
          <h2 className="p-4 text-lg font-bold">Associations disponibles :</h2>
          <hr className="border-blue-950" />
          <div className="flex flex-col gap-4 p-4 my-4 overflow-y-auto rounded-xl no-scrollbar">
            {associations.map((association) => (
              <button
                key={`association:${association.id}`}
                type="button"
                className="flex items-center w-full gap-4 p-2 text-left hover:bg-blue-950 rounded-xl"
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
          <hr className="border-blue-950" />
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
  
export default SelectAssociationModal;