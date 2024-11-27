import NoImage from "../../assets/no-image-found.png";
import { compressImage } from "../../libs/functions";
import { Button } from "../buttons/Buttons";
import Image from "../image";

export default function EditUserAvatar({ user, register, handleSubmit, watch, avatar, setAvatar }) {

    const handleChangeAvatar = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();

        reader.onload = async (e) => {
            const imageData = e.target.result;

            const img = new window.Image();
            img.src = imageData;

            img.onload = async () => {
                const canvas = document.createElement("canvas");
                const ctx = canvas.getContext("2d");

                const size = Math.min(img.width, img.height);
                canvas.width = size;
                canvas.height = size;

                ctx.drawImage(
                    img,
                    (img.width - size) / 2,
                    (img.height - size) / 2,
                    size,
                    size,
                    0,
                    0,
                    size,
                    size
                );

                const squareImage = canvas.toDataURL("image/jpeg");
                const compressedAvatar = await compressImage(squareImage);
                setAvatar(compressedAvatar);
            };
        };

        reader.readAsDataURL(file);
    };

    const handleDeleteAvatar = () => {
        setAvatar(null);
    }
    
    return (
        <div className="flex items-center justify-between gap-4 w-full">
            <div className="relative">
                <div className="w-full aspect-square rounded-xl overflow-hidden flex-shrink-0
                    border-2 border-gray-800">
                    {avatar === undefined ? (
                        <Image
                            blobUrl={user.avatarUrl} 
                            fallback={NoImage}
                            className="object-cover"
                        />
                    ) : (
                        <img 
                            src={avatar ?? NoImage}
                            alt="avatar"
                            className="w-full h-full object-cover"
                        />
                    )}
                </div>
            </div>
            <div className="flex flex-col gap-3 w-48 flex-shrink-0">
                <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    id="avatar-input"
                    onChange={handleChangeAvatar}
                />
                <label
                    htmlFor="avatar-input"
                    className="w-full px-4 h-12 flex items-center justify-center bg-blue-600 
                        hover:bg-blue-700 text-gray-50 rounded-lg cursor-pointer text-center 
                        transition-colors"
                >
                    Changer l&apos;avatar
                </label>
                <Button 
                    styleType="destructive"
                    disabled={avatar === null || !user.avatarUrl}
                    onClick={handleDeleteAvatar}
                >
                    Supprimer l&apos;avatar
                </Button>
            </div>
        </div>
    );
}