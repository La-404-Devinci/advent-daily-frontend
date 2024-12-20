import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Button } from "./buttons/Buttons";

export default function QRModal({ onClose }) {
  const [qrCode, setQRCode] = useState(null);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/auth/me/qr`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setQRCode(data.response[0].data))
      .catch((err) => {
        console.log(err);
        toast.error(
          "Une erreur est survenue lors de la récupération du QR Code",
          {
            className: "border-red-800 bg-gray-900",
            classNames: {
              icon: "text-red-800",
            },
            cancel: {
              label: "Fermer",
            },
            cancelButtonStyle: {
              backgroundColor: "#f9fafb",
              color: "#030712",
            },
          }
        );
      });
  }, []);

  return (
    <>
      <div
        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border
        border-blue-950 rounded-2xl bg-[#030712] w-11/12 max-w-[30rem] z-50"
      >
        <div className="w-full py-4 px-6">
          <h3 className="text-center text-2xl text-gray-50 font-semibold">
            Mon QR Code
          </h3>
        </div>
        <div
          className="py-4 w-full border-t border-b border-blue-950 flex flex-col items-center
          justify-center gap-3"
        >
          <div className="w-full max-w-72 aspect-square rounded-lg overflow-hidden p-4 flex-shrink-0 bg-white">
            <img
              src={qrCode}
              alt="your qr code"
              className="w-full h-full object-contain"
            />
          </div>
          <div className="text-center text-gray-300 px-6">
            <p>
              Partagez votre QR Code avec les associations pour recevoir vos
              points!
            </p>
          </div>
        </div>
        <div className="w-full py-4 px-6">
          <Button
            styleType="secondary"
            className="w-full"
            onClick={() => onClose(false)}
          >
            Fermer
          </Button>
        </div>
      </div>
      <div
        className="fixed top-0 left-0 w-full h-full bg-black/50 z-10 backdrop-blur-sm filter-active"
        onClick={() => onClose(false)}
      />
    </>
  );
}
