import NoImage from "../../assets/no-image-found.png";
import {compressImage, cropImage} from "../../libs/functions";
import {Button} from "../buttons/Buttons";
import Image from "../image";

export default function EditUserAvatar({user, register, handleSubmit, watch, avatar, setAvatar}) {

    const handleChangeAvatar = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        // Create a FileReader instance
        const reader = new FileReader();

        // Set up the onload handler
        reader.onload = async (e) => {
            // e.target.result contains the file's contents as a data URL
            const imageData = e.target.result;
            // Crop the image
            const squareImage = await cropImage(imageData);
            // Compress the image
            const compressedAvatar = await compressImage(squareImage);
            setAvatar(compressedAvatar);


        };

        reader.readAsDataURL(file);
    }

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