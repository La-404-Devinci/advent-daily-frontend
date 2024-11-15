import { ChevronsDown } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "../buttons/Buttons";
import Logo from "../layout/logo";

const ConfirmationModal = ({
    setIsOpen,
    selectedAssociation,
  }) => {
    const navigate = useNavigate();
  
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-opacity-50 bg-gray-950">
        <div className="flex flex-col justify-between mx-10 bg-gray-950 border border-blue-950 h-fit w-96 rounded-2xl">
          <h2 className="p-4 text-gray-50 font-bold text-center">
           Attention : Ce choix est définitif !
          </h2>
          <hr className="border-blue-950" />
          <div className="flex flex-col no-scrollbar">
            <div className="flex flex-col items-center w-full gap-3 p-4">
              <div className="flex items-center justify-start w-full gap-3 p-3 text-sm text-left
               text-gray-50 bg-opacity-50 border border-blue-950 rounded-xl bg-gray-950">
                <Logo
                  path={selectedAssociation.avatar_url}
                  alt={selectedAssociation.name}
                  className="w-10 h-10"
                />
                <p className="text-2xl font-bold">
                  {selectedAssociation.name}
                </p>
              </div>
              <ChevronsDown className="w-6 h-6" />
              <div className="flex items-center justify-center w-full h-16 gap-3 p-3 text-2xl font-bold
               text-center text-gray-50 bg-opacity-50 border border-blue-950 rounded-xl bg-gray-950">
                Emaaaal
              </div>
            </div>
            <hr className="border-blue-950" />
            <div className="flex flex-col gap-4 p-4">
              <Button
                styleType="primary"
                type="submit"
                onClick={() => navigate("/calendar")}
              >
                Je valide mon asso !
              </Button>
              <Button
                styleType="secondary"
                type="button"
                onClick={() => setIsOpen(false)}
              >
                Annuler
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
};

export default ConfirmationModal;